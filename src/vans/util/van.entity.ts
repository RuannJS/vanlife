import { VanType } from '@prisma/client';

export class Van {
  id: string;
  price: number;
  name: string;
  type: VanType;
  hostId: string;
}
