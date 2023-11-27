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
import { ApiProperty, OmitType } from '@nestjs/swagger';
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

export class UserClass {
  @ApiProperty({
    example: 'John',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Smith',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'johnsmith@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'qwerty123',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'Male|Female',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Validate(IsGender)
  sex: string;

  @ApiProperty({
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(6)
  course: number;

  @ApiProperty({
    example: 'Design',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  direction: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  token: string;
}

export class SignUpDto extends OmitType(UserClass, ['token', 'created_at']) {}

export class SignInDto extends PickType(SignUpDto, [
  'email',
  'password',
] as const) {}
