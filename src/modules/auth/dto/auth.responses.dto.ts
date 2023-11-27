import { OmitType } from '@nestjs/mapped-types';
import { AuthDto } from './auth.dto';

export class SignUpResponseDto extends OmitType(AuthDto, ['token'] as const) {}
