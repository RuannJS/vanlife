import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
  imports: [PrismaModule],
})
export class UserModule {}
