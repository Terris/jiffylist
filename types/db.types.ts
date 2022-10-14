export type GameProps = {
  id: string;
  name: string;
  userId: string;
};

export type FriendProps = {
  id: string;
  ownerId: string;
  userIds: string[];
  accepted?: boolean;
};

export type UserProfileProps = {
  userId: string;
  name?: string;
};
