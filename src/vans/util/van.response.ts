import { User, VanType } from '@prisma/client';

export interface VanResponse {
  name: string;
  price: number;
  type: VanType;
  imageUrl: string;
  id: string;
  host: User;
}
