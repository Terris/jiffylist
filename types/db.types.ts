import { ObjectId } from 'bson';

export type ListItemProps = {
  _id: ObjectId;
  _partition?: string;
  description: string;
  created_at: Timestamp;
  updated_at: Timestamp;
};
