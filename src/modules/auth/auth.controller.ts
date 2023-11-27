import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from 'src/types/user.type';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
  })
  @ApiBody({
    type: SignUpDto,
    description: 'JSON structure for user',
  })
  @HttpCode(201)
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    const user = await this.authService.signUp(signUpDto);

    return user;
  }

  @Post('/signin')
  @ApiResponse({
    status: 200,
    description: 'The user has successfully logged in',
  })
  @ApiBody({
    type: SignInDto,
    description: 'JSON structure for user sign in',
  })
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto): Promise<User> {
    const user = await this.authService.signIn(signInDto);

    return user;
  }
}
