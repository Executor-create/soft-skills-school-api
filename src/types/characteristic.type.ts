import { ObjectId } from 'mongoose';

export type Characteristic = {
  titles: string[];
  softSkill: {
    softSkillId: ObjectId;
    type: string;
    created_at: Date;
  };
  created_at: Date;
};
