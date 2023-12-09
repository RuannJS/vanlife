import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DecodedJwt } from './util/decoded-jwt';
import { User } from './util/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserInformation(user: DecodedJwt): Promise<User> {
    const getUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    return getUser;
  }
}
