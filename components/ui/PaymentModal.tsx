'use client';

import { useState, useEffect } from 'react';
import { usePayment } from '../../lib/hooks/usePayment';
import { PaymentConfig } from '../../lib/payment';
import { Modal } from './Modal';
import { Loader2, CheckCircle, XCircle, DollarSign, Clock } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bountyTitle: string;
  amount: string;
  recipient: string;
  bountyId?: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  bountyTitle,
  amount,
  recipient,
  bountyId,
}: PaymentModalProps) {
  const {
    isProcessing,
    error,
    lastResult,
    usdcBalance,
    processPayment,
    checkPaymentStatus,
    estimateGas,
    clearError,
    reset,
  } = usePayment();

  const [step, setStep] = useState<'confirm' | 'processing' | 'success' | 'error'>('confirm');
  const [gasEstimate, setGasEstimate] = useState<string>('');
  const [confirmations, setConfirmations] = useState(0);
  const [transactionHash, setTransactionHash] = useState<string>('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('confirm');
      setConfirmations(0);
      setTransactionHash('');
      reset();
      
      // Estimate gas for the payment
      estimateGasForPayment();
    }
  }, [isOpen, reset]);

  // Monitor payment processing
  useEffect(() => {
    if (isProcessing) {
      setStep('processing');
    } else if (lastResult) {
      if (lastResult.success) {
        setStep('success');
        setTransactionHash(lastResult.transactionHash || '');
        if (lastResult.transactionHash) {
          monitorConfirmations(lastResult.transactionHash);
        }
      } else {
        setStep('error');
      }
    }
  }, [isProcessing, lastResult]);

  const estimateGasForPayment = async () => {
    try {
      const config: PaymentConfig = {
        amount,
        recipient,
        description: `Payment for bounty: ${bountyTitle}`,
        metadata: { bountyId, bountyTitle },
      };
      
      const gas = await estimateGas(config);
      // Convert gas to ETH estimate (rough calculation)
      const gasInEth = Number(gas) * 0.000000001; // Approximate gas price
      setGasEstimate(gasInEth.toFixed(6));
    } catch (err) {
      console.error('Failed to estimate gas:', err);
      setGasEstimate('~0.001');
    }
  };

  const monitorConfirmations = async (txHash: string) => {
    const checkInterval = setInterval(async () => {
      try {
        const status = await checkPaymentStatus(txHash);
        setConfirmations(status.confirmations);
        
        if (status.confirmations >= 3) {
          clearInterval(checkInterval);
        }
      } catch (err) {
        console.error('Error monitoring confirmations:', err);
        clearInterval(checkInterval);
      }
    }, 10000); // Check every 10 seconds

    // Clear interval after 5 minutes
    setTimeout(() => clearInterval(checkInterval), 300000);
  };

  const handlePayment = async () => {
    clearError();
    
    const config: PaymentConfig = {
      amount,
      recipient,
      description: `Payment for bounty: ${bountyTitle}`,
      metadata: { bountyId, bountyTitle },
    };

    await processPayment(config);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const renderConfirmStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <DollarSign className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Confirm Payment
        </h3>
        <p className="text-text-secondary">
          You're about to pay for: <span className="font-medium">{bountyTitle}</span>
        </p>
      </div>

      <div className="bg-surface rounded-lg p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-text-secondary">Amount:</span>
          <span className="text-text-primary font-medium">{amount} USDC</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Recipient:</span>
          <span className="text-text-primary font-mono text-sm">
            {recipient.slice(0, 6)}...{recipient.slice(-4)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Your Balance:</span>
          <span className="text-text-primary">{usdcBalance} USDC</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Est. Gas:</span>
          <span className="text-text-primary">~{gasEstimate} ETH</span>
        </div>
      </div>

      {parseFloat(usdcBalance) < parseFloat(amount) && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-sm">
            ⚠️ Insufficient USDC balance. You need {amount} USDC but only have {usdcBalance} USDC.
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleClose}
          className="flex-1 px-4 py-2 bg-surface text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handlePayment}
          disabled={parseFloat(usdcBalance) < parseFloat(amount)}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Pay {amount} USDC
        </button>
      </div>
    </div>
  );

  const renderProcessingStep = () => (
    <div className="text-center space-y-6">
      <Loader2 className="w-12 h-12 text-accent mx-auto animate-spin" />
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Processing Payment
        </h3>
        <p className="text-text-secondary">
          Please confirm the transaction in your wallet and wait for confirmation...
        </p>
      </div>
      
      <div className="bg-surface rounded-lg p-4">
        <div className="flex items-center justify-center gap-2 text-text-secondary">
          <Clock className="w-4 h-4" />
          <span>This may take a few moments</span>
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Payment Successful!
        </h3>
        <p className="text-text-secondary">
          Your payment of {amount} USDC has been sent successfully.
        </p>
      </div>

      {transactionHash && (
        <div className="bg-surface rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-text-secondary">Transaction:</span>
            <a
              href={`https://basescan.org/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 font-mono text-sm"
            >
              {transactionHash.slice(0, 6)}...{transactionHash.slice(-4)}
            </a>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Confirmations:</span>
            <span className="text-text-primary">
              {confirmations}/3 {confirmations >= 3 ? '✅' : '⏳'}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={handleClose}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Close
      </button>
    </div>
  );

  const renderErrorStep = () => (
    <div className="text-center space-y-6">
      <XCircle className="w-12 h-12 text-red-400 mx-auto" />
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Payment Failed
        </h3>
        <p className="text-text-secondary mb-4">
          There was an error processing your payment.
        </p>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep('confirm')}
          className="flex-1 px-4 py-2 bg-surface text-text-primary rounded-lg hover:bg-surface/80 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={handleClose}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 'confirm':
        return renderConfirmStep();
      case 'processing':
        return renderProcessingStep();
      case 'success':
        return renderSuccessStep();
      case 'error':
        return renderErrorStep();
      default:
        return renderConfirmStep();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} variant="escrow_release">
      <div className="p-6">
        {renderContent()}
      </div>
    </Modal>
  );
}
