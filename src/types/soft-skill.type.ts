import { ObjectId } from 'mongoose';

export type CharacteristicWithId = {
  characteristicId: ObjectId;
  title: string;
};

export type SoftSkill = {
  type: string;
  characteristics?: CharacteristicWithId[];
  created_at: Date;
};
