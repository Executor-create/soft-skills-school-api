import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SoftSkillDocument = HydratedDocument<SoftSkill>;

@Schema({ collection: 'soft_skills' })
export class SoftSkill {
  @Prop()
  type: string;

  @Prop()
  created_at: Date;
}

export const SoftSkillSchema = SchemaFactory.createForClass(SoftSkill);
