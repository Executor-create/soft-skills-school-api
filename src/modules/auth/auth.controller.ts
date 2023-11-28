import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from 'src/types/user.type';
import { AuthDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SignInRequest,
  SignUpRequest,
  SignUpResponse,
} from './dto/auth-swagger.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiBody({
    type: SignUpRequest,
    description: 'JSON structure for user',
  })
  @ApiResponse({
    type: SignUpResponse,
    status: 201,
    description: 'The user has been successfully created',
  })
  @ApiResponse({ status: 409, description: 'This email is already registered' })
  @HttpCode(201)
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    const user = await this.authService.signUp(signUpDto);

    return user;
  }

  @Post('/signin')
  @ApiBody({
    type: SignInRequest,
    description: 'JSON structure for user sign in',
  })
  @ApiResponse({
    type: AuthDto,
    status: 200,
    description: 'The user has successfully logged in',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Incorrect email or password',
  })
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto): Promise<User> {
    const user = await this.authService.signIn(signInDto);

    return user;
  }
}
