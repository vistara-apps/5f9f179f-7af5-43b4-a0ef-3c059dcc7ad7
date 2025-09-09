import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BaseBounties - Ship Code, Earn Crypto',
  description:
    'Your Decentralized Bounty Hub on Base - Connect skilled contributors with smart contract opportunities',
  keywords: [
    'Base',
    'bounties',
    'smart contracts',
    'crypto',
    'blockchain',
    'development',
  ],
  authors: [{ name: 'BaseBounties Team' }],
  openGraph: {
    title: 'BaseBounties - Ship Code, Earn Crypto',
    description: 'Your Decentralized Bounty Hub on Base',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
