import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CharacteristicWithSoftSkill } from 'src/types/question.type';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop()
  question: string;

  @Prop()
  type: string;

  @Prop()
  answers: string[];

  @Prop()
  correctAnswers: boolean[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Characteristic' })
  characteristics: CharacteristicWithSoftSkill[];

  @Prop()
  points: number;

  @Prop()
  created_at: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
