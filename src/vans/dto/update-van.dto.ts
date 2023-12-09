import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
} from 'class-validator';
import { VanType } from '@prisma/client';

export class UpdateVanDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsEnum(VanType)
  @IsOptional()
  type: VanType;

  @IsArray({ each: true })
  @IsString()
  @IsOptional()
  photos: string[];
}
