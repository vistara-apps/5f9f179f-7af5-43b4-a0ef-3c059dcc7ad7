'use client';

import { X402Axios } from 'x402-axios';
import { WalletClient } from 'viem';
import { base } from 'viem/chains';

// USDC contract address on Base
export const USDC_BASE_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// X402 payment configuration
export interface PaymentConfig {
  amount: string; // Amount in USDC (e.g., "10.50")
  recipient: string; // Recipient wallet address
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
  receipt?: any;
}

export class PaymentService {
  private x402Client: X402Axios;
  private walletClient: WalletClient | null = null;

  constructor() {
    // Initialize X402 client with Base network configuration
    this.x402Client = new X402Axios({
      chainId: base.id,
      tokenAddress: USDC_BASE_ADDRESS,
      rpcUrl: base.rpcUrls.default.http[0],
    });
  }

  /**
   * Set the wallet client for payment operations
   */
  setWalletClient(client: WalletClient) {
    this.walletClient = client;
  }

  /**
   * Process a payment using the x402 flow
   */
  async processPayment(config: PaymentConfig): Promise<PaymentResult> {
    try {
      if (!this.walletClient) {
        throw new Error('Wallet client not initialized');
      }

      // Validate payment configuration
      this.validatePaymentConfig(config);

      // Convert amount to wei (USDC has 6 decimals)
      const amountInWei = this.parseUSDCAmount(config.amount);

      // Prepare payment request
      const paymentRequest = {
        to: config.recipient,
        amount: amountInWei,
        token: USDC_BASE_ADDRESS,
        description: config.description || 'BaseBounties Payment',
        metadata: config.metadata || {},
      };

      console.log('Processing payment:', paymentRequest);

      // Execute payment through x402
      const result = await this.x402Client.pay(paymentRequest, {
        walletClient: this.walletClient,
      });

      // Wait for transaction confirmation
      const receipt = await this.waitForConfirmation(result.hash);

      return {
        success: true,
        transactionHash: result.hash,
        receipt,
      };
    } catch (error) {
      console.error('Payment failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown payment error',
      };
    }
  }

  /**
   * Check payment status by transaction hash
   */
  async checkPaymentStatus(transactionHash: string): Promise<{
    confirmed: boolean;
    confirmations: number;
    receipt?: any;
  }> {
    try {
      const receipt = await this.x402Client.getTransactionReceipt(transactionHash);
      
      if (!receipt) {
        return { confirmed: false, confirmations: 0 };
      }

      const currentBlock = await this.x402Client.getBlockNumber();
      const confirmations = currentBlock - receipt.blockNumber;

      return {
        confirmed: receipt.status === 'success',
        confirmations,
        receipt,
      };
    } catch (error) {
      console.error('Error checking payment status:', error);
      return { confirmed: false, confirmations: 0 };
    }
  }

  /**
   * Get USDC balance for an address
   */
  async getUSDCBalance(address: string): Promise<string> {
    try {
      const balance = await this.x402Client.getTokenBalance(address, USDC_BASE_ADDRESS);
      return this.formatUSDCAmount(balance);
    } catch (error) {
      console.error('Error getting USDC balance:', error);
      return '0';
    }
  }

  /**
   * Estimate gas for a payment
   */
  async estimatePaymentGas(config: PaymentConfig): Promise<bigint> {
    try {
      const amountInWei = this.parseUSDCAmount(config.amount);
      
      return await this.x402Client.estimateGas({
        to: config.recipient,
        amount: amountInWei,
        token: USDC_BASE_ADDRESS,
      });
    } catch (error) {
      console.error('Error estimating gas:', error);
      return BigInt(100000); // Default gas estimate
    }
  }

  /**
   * Validate payment configuration
   */
  private validatePaymentConfig(config: PaymentConfig): void {
    if (!config.amount || parseFloat(config.amount) <= 0) {
      throw new Error('Invalid payment amount');
    }

    if (!config.recipient || !config.recipient.startsWith('0x')) {
      throw new Error('Invalid recipient address');
    }

    if (config.recipient.length !== 42) {
      throw new Error('Invalid recipient address length');
    }
  }

  /**
   * Convert USDC amount string to wei (6 decimals)
   */
  private parseUSDCAmount(amount: string): bigint {
    const decimals = 6; // USDC has 6 decimal places
    const amountFloat = parseFloat(amount);
    const amountInWei = BigInt(Math.floor(amountFloat * Math.pow(10, decimals)));
    return amountInWei;
  }

  /**
   * Format wei amount to USDC string
   */
  private formatUSDCAmount(amountInWei: bigint): string {
    const decimals = 6;
    const divisor = BigInt(Math.pow(10, decimals));
    const wholePart = amountInWei / divisor;
    const fractionalPart = amountInWei % divisor;
    
    return `${wholePart}.${fractionalPart.toString().padStart(decimals, '0')}`;
  }

  /**
   * Wait for transaction confirmation
   */
  private async waitForConfirmation(transactionHash: string, requiredConfirmations = 1): Promise<any> {
    const maxAttempts = 30; // 5 minutes with 10-second intervals
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const status = await this.checkPaymentStatus(transactionHash);
        
        if (status.confirmed && status.confirmations >= requiredConfirmations) {
          return status.receipt;
        }

        // Wait 10 seconds before next check
        await new Promise(resolve => setTimeout(resolve, 10000));
        attempts++;
      } catch (error) {
        console.error('Error waiting for confirmation:', error);
        attempts++;
      }
    }

    throw new Error('Transaction confirmation timeout');
  }
}

// Singleton instance
export const paymentService = new PaymentService();
