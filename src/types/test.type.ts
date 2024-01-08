import { ObjectId } from 'mongoose';

export type Test = {
  title: string;
  questions: ObjectId[];
  created_at: Date;
};
