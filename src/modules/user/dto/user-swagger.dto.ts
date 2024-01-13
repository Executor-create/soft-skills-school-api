import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class GetAllUsersResponse extends UserDto {}

export class GetUserResponse extends UserDto {}

export class UpdateUserRequest extends PickType(UserDto, [
  'firstName',
] as const) {
  @ApiProperty({
    example: 'Tom',
    required: true,
  })
  firstName: string;
}

export class UpdateUserResponse extends UserDto {
  @ApiProperty({
    example: 'Tom',
    required: true,
  })
  firstName: string;
}
