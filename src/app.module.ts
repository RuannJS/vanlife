import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { VansModule } from './vans/vans.module';

@Module({
  imports: [PrismaModule, UserModule, VansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
