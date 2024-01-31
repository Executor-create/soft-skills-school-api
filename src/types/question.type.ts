import { ObjectId, Types } from 'mongoose';

export type CharacteristicWithSoftSkill = {
  characteristicId: Types.ObjectId;
  title: string;
  softSkill: {
    softSkillId: ObjectId;
    type: string;
  };
  created_at: Date;
};

export type Question = {
  question: string;
  type: string;
  answers?: string[];
  correctAnswers?: boolean[];
  characteristics: CharacteristicWithSoftSkill[];
  points: number;
  created_at: Date;
};
