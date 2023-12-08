import { UserRole } from '@prisma/client';

export class DecodedJwt {
  role: UserRole;
  email: string;

  iat: number;
}
