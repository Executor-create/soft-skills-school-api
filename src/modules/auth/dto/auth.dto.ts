import { IsString, IsNumber, IsEmail, IsNotEmpty } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  sex: string;

  @IsNotEmpty()
  @IsNumber()
  course: number;

  @IsNotEmpty()
  @IsString()
  direction: string;
}

export class SignInDto extends PickType(SignUpDto, [
  'email',
  'password',
] as const) {}
