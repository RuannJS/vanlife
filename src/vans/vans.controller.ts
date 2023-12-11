import {
  Body,
  Controller,
  UseGuards,
  UseInterceptors,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { Roles } from '../decorators/roles/role.decorator';
import { VansService } from './vans.service';
import { UserRole } from '@prisma/client';
import { TokenInterceptor } from '../interceptors/token/token.interceptor';
import { UserGuard } from '../guards/user/user.guard';
import { TokenDecorator } from '../decorators/token/token.decorator';
import { DecodedJwt } from '../user/util/decoded-jwt';
import { AddVanDto } from './dto/add-van.dto';
import { Van } from './util/van.entity';
import { UpdateVanDto } from './dto/update-van.dto';
import { VanResponse } from './util/van.response';

@Controller('vans')
export class VansController {
  constructor(private readonly service: VansService) {}

  //                                    NO AUTHENTICATION ROUTE

  @Get('all')
  async listAllVans(
    @Query('take') take: string,
    @Query('skip') skip: string,
  ): Promise<VanResponse[]> {
    return this.service.listAllVans(take, skip);
  }

  @Roles(UserRole.CONSUMER, UserRole.HOST)
  @UseGuards(UserGuard)
  @UseInterceptors(TokenInterceptor)
  @Get('van/:vanId')
  async getVanById(@Param('vanId') vanId: string) {
    return await this.service.getVanById(vanId);
  }

  //                                     HOST ONLY ROUTES

  @Roles(UserRole.HOST)
  @UseGuards(UserGuard)
  @UseInterceptors(TokenInterceptor)
  @Get('host-vans')
  async listHostVans(@TokenDecorator() host: DecodedJwt): Promise<Van[]> {
    return await this.service.listHostVans(host);
  }

  @Roles(UserRole.HOST)
  @UseGuards(UserGuard)
  @UseInterceptors(TokenInterceptor)
  @Post('add')
  async addVan(
    @Body() data: AddVanDto,
    @TokenDecorator() host: DecodedJwt,
  ): Promise<Van> {
    return await this.service.addVan(data, host);
  }

  @Roles(UserRole.HOST)
  @UseGuards(UserGuard)
  @UseInterceptors(TokenInterceptor)
  @Put('update/:vanId')
  async updateVan(
    @Body() data: UpdateVanDto,
    @TokenDecorator() host: DecodedJwt,
    @Param('vanId') vanId: string,
  ): Promise<Van> {
    return await this.service.updateVan(data, host, vanId);
  }

  @Roles(UserRole.HOST)
  @UseGuards(UserGuard)
  @UseInterceptors(TokenInterceptor)
  @Delete('delete/:vanId')
  async deleteVan(
    @TokenDecorator() host: DecodedJwt,
    @Param('vanId') vanId: string,
  ): Promise<boolean> {
    return await this.service.deleteVan(host, vanId);
  }
}
