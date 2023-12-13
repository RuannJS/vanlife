import { VanType } from '@prisma/client';

export class Van {
  id: string;
  price: number;
  name: string;
  type: VanType;
  imageUrl: string;
  hostId: string;
  isRented: boolean;
}
