export interface User {
  userId: string;
  walletAddress: string;
  skills: string[];
  reputationScore: number;
  pastBounties: string[];
  profilePictureUrl?: string;
  name?: string;
  bio?: string;
  githubUrl?: string;
  twitterUrl?: string;
}

export interface Bounty {
  bountyId: string;
  title: string;
  description: string;
  rewardAmount: string; // in ETH
  requiredSkills: string[];
  status: 'active' | 'completed' | 'awaiting_review' | 'disputed';
  postedByUserId: string;
  completedByUserId?: string;
  escrowAddress?: string;
  createdAt: Date;
  deadline?: Date;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'smart-contracts' | 'security' | 'defi' | 'nft' | 'infrastructure';
  applicants: string[];
  selectedContributor?: string;
}

export interface Skill {
  skillId: string;
  name: string;
  category: 'language' | 'framework' | 'tool' | 'domain';
}

export interface Application {
  applicationId: string;
  bountyId: string;
  userId: string;
  message: string;
  proposedTimeline: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface EscrowContract {
  address: string;
  bountyId: string;
  amount: string;
  status: 'funded' | 'released' | 'disputed';
  createdAt: Date;
}

export type BountyCardVariant = 'active' | 'completed' | 'awaiting_review';
export type ContributorProfileVariant = 'basic' | 'detailed';
export type ModalVariant = 'escrow_release';
