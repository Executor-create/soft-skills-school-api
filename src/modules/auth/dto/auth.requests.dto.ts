import { OmitType, PickType } from '@nestjs/mapped-types';
import { AuthDto } from './auth.dto';

export class SignUpRequestDto extends OmitType(AuthDto, [
  'token',
  'created_at',
] as const) {}

export class SignInRequestDto extends PickType(AuthDto, [
  'email',
  'password',
] as const) {}
