import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserSigninDto } from './dto/user-signin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../util/user.entity';
import { Token } from '../util/token.jwt';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signupUser(data: UserSignupDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user.email === data.email) {
      throw new ConflictException('Email is already in use!');
    }

    const passwordProtection = await bcrypt.hash(data.password, 10);

    return await this.prisma.user.create({
      data: { ...data, password: passwordProtection },
    });
  }

  async signinUser(data: UserSigninDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials!');
    }

    const verifyPassword = await bcrypt.compare(data.password, user.password);

    if (!verifyPassword) {
      throw new NotFoundException('Invalid credentials!');
    }

    const userToken = jwt.sign(
      { role: user.role, email: user.email },
      process.env.USER_KEY,
    );

    return new Token(userToken);
  }
}
