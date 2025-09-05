export const SKILLS = [
  // Languages
  { id: 'solidity', name: 'Solidity', category: 'language' },
  { id: 'rust', name: 'Rust', category: 'language' },
  { id: 'javascript', name: 'JavaScript', category: 'language' },
  { id: 'typescript', name: 'TypeScript', category: 'language' },
  { id: 'python', name: 'Python', category: 'language' },
  { id: 'go', name: 'Go', category: 'language' },
  
  // Frameworks & Tools
  { id: 'hardhat', name: 'Hardhat', category: 'framework' },
  { id: 'foundry', name: 'Foundry', category: 'framework' },
  { id: 'truffle', name: 'Truffle', category: 'framework' },
  { id: 'openzeppelin', name: 'OpenZeppelin', category: 'framework' },
  { id: 'wagmi', name: 'Wagmi', category: 'framework' },
  { id: 'ethers', name: 'Ethers.js', category: 'framework' },
  { id: 'web3js', name: 'Web3.js', category: 'framework' },
  
  // Domains
  { id: 'defi', name: 'DeFi', category: 'domain' },
  { id: 'nft', name: 'NFT', category: 'domain' },
  { id: 'dao', name: 'DAO', category: 'domain' },
  { id: 'security', name: 'Security Auditing', category: 'domain' },
  { id: 'layer2', name: 'Layer 2', category: 'domain' },
  { id: 'bridge', name: 'Cross-chain', category: 'domain' },
] as const;

export const BOUNTY_CATEGORIES = [
  { id: 'smart-contracts', name: 'Smart Contracts', icon: '📝' },
  { id: 'security', name: 'Security Audit', icon: '🔒' },
  { id: 'defi', name: 'DeFi Protocol', icon: '💰' },
  { id: 'nft', name: 'NFT Project', icon: '🎨' },
  { id: 'infrastructure', name: 'Infrastructure', icon: '🏗️' },
] as const;

export const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner', color: 'text-green-400' },
  { id: 'intermediate', name: 'Intermediate', color: 'text-yellow-400' },
  { id: 'advanced', name: 'Advanced', color: 'text-orange-400' },
  { id: 'expert', name: 'Expert', color: 'text-red-400' },
] as const;

export const MOCK_BOUNTIES: Bounty[] = [
  {
    bountyId: '1',
    title: 'ERC-20 Token with Staking Mechanism',
    description: 'Create a secure ERC-20 token with built-in staking rewards. Must include comprehensive tests and documentation.',
    rewardAmount: '2.5',
    requiredSkills: ['solidity', 'hardhat', 'openzeppelin', 'security'],
    status: 'active',
    postedByUserId: 'user1',
    createdAt: new Date('2024-01-15'),
    deadline: new Date('2024-02-15'),
    difficulty: 'intermediate',
    category: 'smart-contracts',
    applicants: ['user2', 'user3'],
  },
  {
    bountyId: '2',
    title: 'DEX Liquidity Pool Security Audit',
    description: 'Comprehensive security audit of a new DEX liquidity pool contract. Looking for experienced auditors.',
    rewardAmount: '5.0',
    requiredSkills: ['solidity', 'security', 'defi'],
    status: 'active',
    postedByUserId: 'user4',
    createdAt: new Date('2024-01-20'),
    deadline: new Date('2024-02-20'),
    difficulty: 'expert',
    category: 'security',
    applicants: ['user5'],
  },
  {
    bountyId: '3',
    title: 'NFT Marketplace Frontend',
    description: 'Build a modern NFT marketplace frontend with wallet integration and real-time updates.',
    rewardAmount: '3.0',
    requiredSkills: ['typescript', 'wagmi', 'nft'],
    status: 'completed',
    postedByUserId: 'user6',
    completedByUserId: 'user7',
    createdAt: new Date('2024-01-10'),
    difficulty: 'advanced',
    category: 'nft',
    applicants: ['user7', 'user8'],
  },
];

export const MOCK_USERS: User[] = [
  {
    userId: 'user1',
    walletAddress: '0x1234...5678',
    skills: ['solidity', 'hardhat', 'defi'],
    reputationScore: 85,
    pastBounties: ['bounty1', 'bounty2'],
    name: 'Alice Developer',
    bio: 'Smart contract developer with 3+ years experience',
  },
  {
    userId: 'user2',
    walletAddress: '0x2345...6789',
    skills: ['security', 'solidity', 'foundry'],
    reputationScore: 92,
    pastBounties: ['bounty3', 'bounty4', 'bounty5'],
    name: 'Bob Auditor',
    bio: 'Security researcher and smart contract auditor',
  },
];
