import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from 'src/types/user.type';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(201)
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    const user = await this.authService.signUp(signUpDto);

    return user;
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(@Body() signInDto: SignInDto): Promise<User> {
    const user = await this.authService.signIn(signInDto);

    return user;
  }
}
