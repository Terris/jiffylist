import { Database } from '../lib/database.types';

export type UserProfileProps = {
  username?: string | null;
  website?: string | null;
  avatarUrl?: string | null;
};

export type ListItemProps = {
  userId: string;
  listId?: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
};
