import {
  IsString,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

@ValidatorConstraint({ name: 'isGender', async: false })
class IsGender implements ValidatorConstraintInterface {
  validate(value: string) {
    return value === 'Male' || value === 'Female';
  }

  defaultMessage(): string {
    return 'The gender must be either male or female';
  }
}

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
  @Validate(IsGender)
  sex: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(6)
  course: number;

  @IsNotEmpty()
  @IsString()
  direction: string;
}

export class SignInDto extends PickType(SignUpDto, [
  'email',
  'password',
] as const) {}
