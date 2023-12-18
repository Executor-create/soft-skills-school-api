import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  _id: string;

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
  sex: string;

  @ApiProperty({
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
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
