import { Module } from '@nestjs/common';
import { VansController } from './vans.controller';
import { VansService } from './vans.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [VansController],
  providers: [VansService],
  imports: [PrismaModule],
})
export class VansModule {}
