import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddVanDto } from './dto/add-van.dto';
import { DecodedJwt } from '../user/util/decoded-jwt';
import { Van } from './util/van.entity';
import { UpdateVanDto } from './dto/update-van.dto';

@Injectable()
export class VansService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllVans(take: string, skip: string): Promise<Van[]> {
    let numberTake = 0;
    let numberSkip = 0;

    take === undefined ? (numberTake = 5) : (numberTake = Number(take));

    skip === undefined ? (numberSkip = 0) : (numberSkip = Number(skip));

    const vanList = await this.prisma.van.findMany({
      take: numberTake,
      skip: numberSkip,
    });

    return vanList;
  }

  //                                    CONSUMER ONLY SERVICES

  async getVanById(vanId: string) {
    const van = await this.prisma.van.findUnique({ where: { id: vanId } });

    if (!van) throw new NotFoundException('Van was not found');

    return van;
  }

  //                                    HOST ONLY SERVICES

  authorizedHost = async (email: string) => {
    return await this.prisma.user.findUnique({ where: { email } });
  };

  async listHostVans(host: DecodedJwt): Promise<Van[]> {
    const authorizedHost = await this.authorizedHost(host.email);

    const vanList = await this.prisma.van.findMany({
      where: { hostId: authorizedHost.id },
    });

    return vanList;
  }

  async addVan(data: AddVanDto, host: DecodedJwt): Promise<Van> {
    const authorizedHost = await this.authorizedHost(host.email);

    const newVan = await this.prisma.van.create({
      data: { ...data, hostId: authorizedHost.id },
    });

    return newVan;
  }

  async updateVan(
    data: UpdateVanDto,
    host: DecodedJwt,
    vanId: string,
  ): Promise<Van> {
    const authorizedHost = await this.authorizedHost(host.email);

    if (host.email !== authorizedHost.email) {
      throw new UnauthorizedException('Unauthorized action!');
    }

    const updatedVan = await this.prisma.van.update({
      where: { id: vanId },
      data,
    });

    return updatedVan;
  }

  async deleteVan(host: DecodedJwt, vanId: string): Promise<boolean> {
    const authorizedHost = await this.authorizedHost(host.email);

    if (host.email !== authorizedHost.email) {
      throw new UnauthorizedException('Unauthorized action!');
    }

    const deleteVan = await this.prisma.van.delete({ where: { id: vanId } });

    if (deleteVan) return true;

    return false;
  }
}
