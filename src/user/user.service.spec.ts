import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './util/user.entity';
import { ObjectId } from 'mongodb';
import { DecodedJwt } from './util/decoded-jwt';

describe('UserService', () => {
  let prisma: PrismaService;
  let service: UserService;

  const mockUser: User = {
    name: 'mocked-user',
    email: 'mocked@email.com',
    password: '$2b$10$uNM8b2q8kq6I8Xo5fk11v.m/bmsTwnc6WtG3hrzTV7O2Vw09iPLr6',
    role: 'CONSUMER',
    id: new ObjectId().toString(),
  };

  const mockDecodedJwt: DecodedJwt = {
    email: mockUser.email,
    iat: 1,
    role: mockUser.role,
  };

  const mockPrisma = {
    user: {
      findUnique: jest.fn().mockResolvedValue(mockUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getUserInformation', () => {
    it('should return user information', async () => {
      const user = await service.getUserInformation(mockDecodedJwt);
      expect(user).toEqual(mockUser);
    });
  });
});
