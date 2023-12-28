import { Role } from 'src/common/enums/user-role.enum';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sex: string;
  course: number;
  direction: string;
  role: Role;
  token: string;
  created_at: Date;
};
