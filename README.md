# BaseBounties - Ship Code, Earn Crypto

Your decentralized bounty hub on Base. Connect skilled contributors with smart contract opportunities and build the future of Web3.

## 🚀 Features

- **Curated Bounty Board**: Continuously updated smart contract development and security bounties
- **AI-Powered Matching**: Intelligent system matching bounties to contributors based on skills and reputation
- **On-Chain Escrow**: Secure smart contract escrow with automated payouts
- **Reputation System**: Build verifiable on-chain reputation through successful bounty completions
- **Mobile-First Design**: Optimized for mobile devices with beautiful cyberpunk-inspired UI

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network
- **Wallet Integration**: OnchainKit + MiniKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout
- **State Management**: React hooks and context

## 🎨 Design System

### Colors
- **Primary**: `hsl(216, 84%, 47%)` - Deep blue
- **Accent**: `hsl(192, 89%, 53%)` - Cyan
- **Background**: `hsl(220, 30%, 8%)` - Dark navy
- **Surface**: `hsl(216, 28%, 12%)` - Lighter navy
- **Text Primary**: `hsl(210, 50%, 95%)` - Light gray
- **Text Secondary**: `hsl(210, 50%, 75%)` - Medium gray

### Components
- **BountyCard**: Display bounty information with status variants
- **ContributorProfile**: Show user profiles with reputation scores
- **SkillTag**: Interactive skill badges
- **ConnectWalletButton**: OnchainKit wallet integration
- **Modal**: Reusable modal component for actions

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your OnchainKit API key:
   ```
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Base Mini App Integration

This app is built as a Base Mini App with:

- **MiniKitProvider**: Handles wallet connections and Base network integration
- **OnchainKit Components**: Identity and wallet components
- **Frame Ready**: Signals readiness for Farcaster frame integration
- **Mobile Optimized**: Designed for mobile-first experience

## 🏗 Architecture

### Data Models

- **User**: Wallet address, skills, reputation score, past bounties
- **Bounty**: Title, description, reward amount, required skills, status
- **Skill**: Categorized skills (languages, frameworks, domains)
- **Application**: User applications to bounties with status tracking

### Key Features Implementation

1. **Bounty Discovery**: Filter by skills, category, difficulty, and sort options
2. **AI Matching**: Calculate match scores based on user skills vs required skills
3. **Escrow System**: Mock smart contract addresses for secure fund holding
4. **Reputation Tracking**: On-chain reputation scores and leaderboards

## 🔐 Security Features

- **Secure Escrow**: Smart contract-based fund holding
- **Reputation System**: Verifiable on-chain reputation
- **Wallet Integration**: Secure wallet connections via OnchainKit
- **Input Validation**: Comprehensive form validation and sanitization

## 🎯 User Flows

### Bounty Seeker (Posting)
1. Connect wallet
2. Navigate to "Post Bounty"
3. Fill bounty details and approve escrow
4. Bounty goes live on the board

### Contributor (Applying)
1. Browse bounties with AI-powered recommendations
2. Apply with cover message and timeline
3. Get selected by bounty issuer
4. Complete work and receive automated payout

### Completion & Payout
1. Submit proof of work
2. Issuer reviews and approves
3. Escrow automatically releases funds
4. Reputation scores updated for both parties

## 🌟 Future Enhancements

- **Advanced AI Matching**: Machine learning-based contributor recommendations
- **Dispute Resolution**: Decentralized arbitration system
- **Multi-Chain Support**: Expand beyond Base to other networks
- **Advanced Analytics**: Detailed performance metrics and insights
- **Team Bounties**: Support for multi-contributor bounties

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more information.

---

Built with ❤️ on Base Network
