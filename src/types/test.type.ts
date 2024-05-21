import { QuestionLeanDocument } from 'src/database/models/question.schema';
import { Question } from './question.type';

export type Test = {
  title: string;
  questions: QuestionLeanDocument[];
  created_at: Date;
  created_by: string;
  status: string;
};
