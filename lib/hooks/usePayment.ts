'use client';

import { useState, useCallback, useEffect } from 'react';
import { useWalletClient, useAccount } from 'wagmi';
import { paymentService, PaymentConfig, PaymentResult } from '../payment';

export interface UsePaymentReturn {
  // Payment state
  isProcessing: boolean;
  error: string | null;
  lastResult: PaymentResult | null;
  
  // Payment actions
  processPayment: (config: PaymentConfig) => Promise<PaymentResult>;
  checkPaymentStatus: (txHash: string) => Promise<{
    confirmed: boolean;
    confirmations: number;
    receipt?: any;
  }>;
  
  // Balance and gas estimation
  usdcBalance: string;
  estimateGas: (config: PaymentConfig) => Promise<bigint>;
  refreshBalance: () => Promise<void>;
  
  // Utility functions
  clearError: () => void;
  reset: () => void;
}

export function usePayment(): UsePaymentReturn {
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<PaymentResult | null>(null);
  const [usdcBalance, setUsdcBalance] = useState('0');

  // Initialize wallet client when available
  useEffect(() => {
    if (walletClient) {
      paymentService.setWalletClient(walletClient);
    }
  }, [walletClient]);

  // Load USDC balance when wallet connects
  useEffect(() => {
    if (address && isConnected) {
      refreshBalance();
    }
  }, [address, isConnected]);

  const processPayment = useCallback(async (config: PaymentConfig): Promise<PaymentResult> => {
    if (!isConnected || !walletClient) {
      const error = 'Wallet not connected';
      setError(error);
      return { success: false, error };
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await paymentService.processPayment(config);
      setLastResult(result);
      
      if (!result.success) {
        setError(result.error || 'Payment failed');
      } else {
        // Refresh balance after successful payment
        setTimeout(refreshBalance, 2000);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      const result = { success: false, error: errorMessage };
      setLastResult(result);
      return result;
    } finally {
      setIsProcessing(false);
    }
  }, [isConnected, walletClient]);

  const checkPaymentStatus = useCallback(async (txHash: string) => {
    try {
      return await paymentService.checkPaymentStatus(txHash);
    } catch (err) {
      console.error('Error checking payment status:', err);
      return { confirmed: false, confirmations: 0 };
    }
  }, []);

  const estimateGas = useCallback(async (config: PaymentConfig): Promise<bigint> => {
    try {
      return await paymentService.estimatePaymentGas(config);
    } catch (err) {
      console.error('Error estimating gas:', err);
      return BigInt(100000);
    }
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!address) {
      setUsdcBalance('0');
      return;
    }

    try {
      const balance = await paymentService.getUSDCBalance(address);
      setUsdcBalance(balance);
    } catch (err) {
      console.error('Error fetching USDC balance:', err);
      setUsdcBalance('0');
    }
  }, [address]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setLastResult(null);
    setIsProcessing(false);
  }, []);

  return {
    // State
    isProcessing,
    error,
    lastResult,
    usdcBalance,
    
    // Actions
    processPayment,
    checkPaymentStatus,
    estimateGas,
    refreshBalance,
    
    // Utilities
    clearError,
    reset,
  };
}
