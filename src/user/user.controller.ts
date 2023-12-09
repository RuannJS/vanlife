import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignupDto } from './auth/dto/user-signup.dto';
import { AuthService } from './auth/auth.service';
import { User } from './util/user.entity';
import { UserSigninDto } from './auth/dto/user-signin.dto';
import { Token } from './util/token.jwt';
import { UserGuard } from '../guards/user/user.guard';
import { Roles } from 'src/decorators/roles/role.decorator';
import { UserRole } from '@prisma/client';
import { TokenInterceptor } from 'src/interceptors/token/token.interceptor';
import { TokenDecorator } from 'src/decorators/token/token.decorator';
import { DecodedJwt } from './util/decoded-jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly user: UserService,
    private readonly auth: AuthService,
  ) {}

  //                    NO  AUTHENTICATION ROUTES

  @Post('signup')
  async signupUser(@Body() data: UserSignupDto): Promise<User> {
    return await this.auth.signupUser(data);
  }

  @Post('signin')
  async signinUser(@Body() data: UserSigninDto): Promise<Token> {
    return await this.auth.signinUser(data);
  }

  //                 AUTHORIZATION ROUTES

  @Roles(UserRole.CONSUMER, UserRole.HOST)
  @UseGuards(UserGuard)
  @UseInterceptors(TokenInterceptor)
  @Get('info')
  async getUserInformation(@TokenDecorator() user: DecodedJwt): Promise<User> {
    return await this.user.getUserInformation(user);
  }
}
