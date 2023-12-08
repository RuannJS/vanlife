import { UserRole } from '@prisma/client';

export class User {
  id: string;
  name: string;
  password: string;
  email: string;
  role: UserRole;
}
