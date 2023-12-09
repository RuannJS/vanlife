import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../util/user.entity';
import { ObjectId } from 'mongodb';
import { UserSigninDto } from './dto/user-signin.dto';
import { Token } from '../util/token.jwt';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  const mockUser: User = {
    name: 'mocked-user',
    email: 'mocked@email.com',
    password: '$2b$10$uNM8b2q8kq6I8Xo5fk11v.m/bmsTwnc6WtG3hrzTV7O2Vw09iPLr6',
    role: 'CONSUMER',
    id: new ObjectId().toString(),
  };

  const mockUserSignin: UserSigninDto = {
    email: mockUser.email,
    password: '12345',
  };

  const mockPrisma = {
    user: {
      findUnique: jest.fn().mockResolvedValue(mockUser),
      create: jest.fn().mockResolvedValue(mockUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('signupUser', () => {
    it('should return a new user', async () => {
      const user = await service.signupUser({
        name: 'newMock',
        email: 'new@mock.com',
        password: '12345',
        role: 'CONSUMER',
      });

      expect(user).toEqual(mockUser);
    });
  });

  describe('signinUser', () => {
    it('should return user jwt token', async () => {
      const token = await service.signinUser(mockUserSignin);

      expect(token).toBeDefined();
    });
  });
});
