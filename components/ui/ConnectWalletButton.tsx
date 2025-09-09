'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';

interface ConnectWalletButtonProps {
  variant?: 'default' | 'compact';
}

export function ConnectWalletButton({
  variant = 'default',
}: ConnectWalletButtonProps) {
  const { isConnected } = useAccount();

  if (variant === 'compact') {
    return (
      <Wallet>
        <ConnectWallet className="btn-primary">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6" />
              <Name />
            </div>
          ) : (
            'Connect Wallet'
          )}
        </ConnectWallet>
      </Wallet>
    );
  }

  return (
    <Wallet>
      <ConnectWallet className="btn-primary">
        <div className="flex items-center gap-3">
          {isConnected && <Avatar className="w-8 h-8" />}
          <div className="flex flex-col items-start">
            {isConnected ? (
              <>
                <Name className="font-medium" />
                <span className="text-sm text-text-secondary">Connected</span>
              </>
            ) : (
              <span className="font-medium">Connect Wallet</span>
            )}
          </div>
        </div>
      </ConnectWallet>
    </Wallet>
  );
}
