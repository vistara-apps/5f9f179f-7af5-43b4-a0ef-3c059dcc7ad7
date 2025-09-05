# X402 Payment Integration for BaseBounties

This document describes the implementation of the x402 payment flow for the BaseBounties application, enabling USDC payments on the Base network.

## Overview

The x402 integration allows users to make secure USDC payments directly from the BaseBounties interface using their connected wallets. The implementation leverages:

- **wagmi** for wallet client management
- **x402-axios** for payment processing
- **USDC on Base** as the payment token
- **OnchainKit** for wallet connection

## Architecture

### Core Components

1. **PaymentService** (`lib/payment.ts`)
   - Handles x402 client initialization
   - Processes payments and manages transactions
   - Provides balance checking and gas estimation

2. **usePayment Hook** (`lib/hooks/usePayment.ts`)
   - React hook for payment state management
   - Integrates with wagmi wallet client
   - Handles error states and loading

3. **PaymentModal** (`components/ui/PaymentModal.tsx`)
   - User interface for payment confirmation
   - Real-time transaction monitoring
   - Error handling and retry logic

4. **BountyCard Integration** (`components/ui/BountyCard.tsx`)
   - Payment button integration
   - Bounty-specific payment context

## Implementation Details

### Payment Flow

1. **Wallet Connection**
   ```typescript
   // Wallet client is automatically provided by wagmi
   const { data: walletClient } = useWalletClient();
   ```

2. **Payment Processing**
   ```typescript
   const config: PaymentConfig = {
     amount: '10.50', // USDC amount
     recipient: '0x742d35Cc6634C0532925a3b8D0Ac6d7d3f8b2Ae1',
     description: 'Payment for bounty: Smart Contract Audit',
     metadata: { bountyId: 'bounty-123' }
   };
   
   const result = await paymentService.processPayment(config);
   ```

3. **Transaction Monitoring**
   ```typescript
   const status = await paymentService.checkPaymentStatus(txHash);
   console.log(`Confirmations: ${status.confirmations}/3`);
   ```

### USDC Integration

- **Contract Address**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` (USDC on Base)
- **Decimals**: 6 (1 USDC = 1,000,000 wei)
- **Network**: Base (Chain ID: 8453)

### Error Handling

The implementation includes comprehensive error handling for:

- Insufficient USDC balance
- Invalid recipient addresses
- Network connectivity issues
- Transaction rejections
- Confirmation timeouts

## Usage Examples

### Basic Payment

```typescript
import { usePayment } from '@/lib/hooks/usePayment';

function PaymentComponent() {
  const { processPayment, isProcessing, error } = usePayment();
  
  const handlePay = async () => {
    const result = await processPayment({
      amount: '25.00',
      recipient: '0x742d35Cc6634C0532925a3b8D0Ac6d7d3f8b2Ae1',
      description: 'Bounty payment'
    });
    
    if (result.success) {
      console.log('Payment successful:', result.transactionHash);
    }
  };
  
  return (
    <button onClick={handlePay} disabled={isProcessing}>
      {isProcessing ? 'Processing...' : 'Pay with USDC'}
    </button>
  );
}
```

### Payment Modal Integration

```typescript
import { PaymentModal } from '@/components/ui/PaymentModal';

function BountyComponent({ bounty }) {
  const [showPayment, setShowPayment] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowPayment(true)}>
        Pay {bounty.rewardAmount} USDC
      </button>
      
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        bountyTitle={bounty.title}
        amount={bounty.rewardAmount}
        recipient={bounty.escrowAddress}
        bountyId={bounty.bountyId}
      />
    </>
  );
}
```

## Testing

### Unit Tests

Run the payment service tests:

```bash
npm test lib/tests/payment.test.ts
```

### Manual Testing Checklist

- [ ] Wallet connection works with Base network
- [ ] USDC balance displays correctly
- [ ] Payment modal opens with correct details
- [ ] Gas estimation shows reasonable values
- [ ] Payment validation prevents invalid inputs
- [ ] Transaction signing works through wallet
- [ ] Transaction hash is captured and displayed
- [ ] Confirmation monitoring updates in real-time
- [ ] Success state shows transaction link to BaseScan
- [ ] Error states display helpful messages

### Integration Test Scenarios

1. **Successful Payment Flow**
   - Connect wallet → Select bounty → Confirm payment → Monitor confirmations

2. **Insufficient Balance**
   - Attempt payment with low USDC balance → See warning message

3. **Transaction Rejection**
   - Start payment → Reject in wallet → See error state with retry option

4. **Network Error Handling**
   - Simulate network issues → Observe graceful error handling

## Configuration

### Environment Variables

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
```

### Network Configuration

The payment service is configured for Base mainnet:

```typescript
const x402Client = new X402Axios({
  chainId: 8453, // Base mainnet
  tokenAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC
  rpcUrl: 'https://mainnet.base.org'
});
```

## Security Considerations

1. **Input Validation**
   - All payment amounts are validated
   - Recipient addresses are checked for format and length
   - Metadata is sanitized

2. **Transaction Safety**
   - Users must explicitly confirm transactions in their wallet
   - Gas estimation prevents failed transactions
   - Confirmation monitoring ensures transaction finality

3. **Error Recovery**
   - Failed transactions can be retried
   - Network errors are handled gracefully
   - User funds are never at risk

## Performance Metrics

Expected performance benchmarks:

- Wallet connection: < 2 seconds
- Balance retrieval: < 3 seconds
- Gas estimation: < 2 seconds
- Transaction confirmation: < 15 seconds
- Modal rendering: < 500ms

## Troubleshooting

### Common Issues

1. **"Wallet client not initialized"**
   - Ensure wallet is connected before attempting payment
   - Check that wagmi is properly configured

2. **"Invalid recipient address"**
   - Verify address format (0x followed by 40 hex characters)
   - Ensure address is a valid Ethereum address

3. **"Insufficient USDC balance"**
   - Check wallet USDC balance on Base network
   - Ensure user has enough USDC for payment + gas

4. **Transaction timeout**
   - Check Base network status
   - Verify wallet connection is stable
   - Try increasing gas limit

### Debug Mode

Enable debug logging:

```typescript
// In payment service
console.log('Processing payment:', paymentRequest);
console.log('Transaction result:', result);
```

## Future Enhancements

1. **Multi-token Support**
   - Support for ETH and other Base tokens
   - Dynamic token selection

2. **Batch Payments**
   - Multiple bounty payments in single transaction
   - Gas optimization for bulk operations

3. **Payment Scheduling**
   - Delayed payment execution
   - Recurring payment support

4. **Advanced Monitoring**
   - Real-time gas price optimization
   - MEV protection

## Support

For issues related to the x402 integration:

1. Check the troubleshooting section above
2. Review the test files for expected behavior
3. Verify Base network connectivity
4. Ensure wallet has sufficient USDC balance

## References

- [x402-axios Documentation](https://github.com/x402-protocol/x402-axios)
- [Base Network Documentation](https://docs.base.org/)
- [USDC on Base](https://basescan.org/token/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)
- [wagmi Documentation](https://wagmi.sh/)
- [OnchainKit Documentation](https://onchainkit.xyz/)
