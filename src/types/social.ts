
export interface Party {
  id: string;
  name: string;
  description: string | null;
  invite_code: string;
  created_at: string;
  updated_at: string;
  member_count?: number;
  is_leader?: boolean;
}

export interface Guild {
  id: string;
  name: string;
  description: string | null;
  motto: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
  member_count?: number;
  user_role?: string;
}

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: string;
  created_at: string;
  username?: string;
  avatar_url?: string;
}

export interface SocialStats {
  partyCount: number;
  guildCount: number;
  friendCount: number;
  achievementCount: number;
}

export interface SocialContextType {
  userParty: Party | null;
  userGuild: Guild | null;
  friends: Friend[];
  pendingFriends: Friend[];
  socialStats: SocialStats;
  createParty: (name: string, description?: string) => Promise<Party | null>;
  joinPartyWithCode: (inviteCode: string) => Promise<boolean>;
  leaveParty: () => Promise<boolean>;
  createGuild: (name: string, description?: string, motto?: string) => Promise<Guild | null>;
  joinGuild: (guildId: string) => Promise<boolean>;
  leaveGuild: () => Promise<boolean>;
  sendFriendRequest: (username: string) => Promise<boolean>;
  acceptFriendRequest: (friendshipId: string) => Promise<boolean>;
  rejectFriendRequest: (friendshipId: string) => Promise<boolean>;
  removeFriend: (friendshipId: string) => Promise<boolean>;
  refreshSocialData: () => Promise<void>;
  isLoading: boolean;
}
