import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop()
  question: string;

  @Prop()
  type: string;

  @Prop()
  category: string;

  @Prop()
  points: number;

  @Prop()
  created_at: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
