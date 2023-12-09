import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './util/user.entity';
import { ObjectId } from 'mongodb';
import { UserSigninDto } from './auth/dto/user-signin.dto';
import { Token } from './util/token.jwt';
import { DecodedJwt } from './util/decoded-jwt';
import { AuthService } from './auth/auth.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let auth: AuthService;

  const mockToken: Token = new Token('token');

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

  const mockUserSignin: UserSigninDto = {
    email: mockUser.email,
    password: '12345',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUserInformation: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: AuthService,
          useValue: {
            signupUser: jest.fn().mockResolvedValue(mockUser),
            signinUser: jest.fn().mockResolvedValue(mockToken),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
    auth = module.get<AuthService>(AuthService);
  });

  describe('signupUser', () => {
    it('should create a new user and return it', async () => {
      const user = await controller.signupUser({
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
      const token = await controller.signinUser(mockUserSignin);

      expect(token).toEqual(mockToken);
    });
  });

  describe('getUserInformation', () => {
    it('should return user information', async () => {
      const user = await controller.getUserInformation(mockDecodedJwt);

      expect(user).toEqual(mockUser);
    });
  });
});
