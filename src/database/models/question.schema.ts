import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { CharacteristicWithSoftSkill } from 'src/types/question.type';

export type QuestionDocument = HydratedDocument<Question>;
export type QuestionLeanDocument = Question & { _id: Types.ObjectId };

@Schema()
export class Question {
  @Prop()
  question: string;

  @Prop()
  type: string;

  @Prop()
  answers: string[];

  @Prop()
  correctAnswers: number[];

  @Prop({ type: Array<any> })
  characteristics: CharacteristicWithSoftSkill[];

  @Prop()
  created_at: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
