import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from 'src/types/user.type';
import { AuthDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInRequestDto, SignUpRequestDto } from './dto/auth.requests.dto';
import { SignUpResponseDto } from './dto/auth.responses.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    type: SignUpResponseDto,
    status: 201,
    description: 'The user has been successfully created',
  })
  @ApiBody({
    type: SignUpRequestDto,
    description: 'JSON structure for user',
  })
  @HttpCode(201)
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    const user = await this.authService.signUp(signUpDto);

    return user;
  }

  @Post('/signin')
  @ApiResponse({
    type: AuthDto,
    status: 200,
    description: 'The user has successfully logged in',
  })
  @ApiBody({
    type: SignInRequestDto,
    description: 'JSON structure for user sign in',
  })
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto): Promise<User> {
    const user = await this.authService.signIn(signInDto);

    return user;
  }
}
