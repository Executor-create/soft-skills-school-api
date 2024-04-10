import { ObjectId, Types } from 'mongoose';
import { Question } from './question.type';

export type Test = {
  title: string;
  questions: Question[];
  created_at: Date;
  created_by: string;
  status: string;
};
