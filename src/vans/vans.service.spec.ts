import { Test, TestingModule } from '@nestjs/testing';
import { VansService } from './vans.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/util/user.entity';
import { Van } from './util/van.entity';
import { DecodedJwt } from '../user/util/decoded-jwt';

describe('VansService', () => {
  let service: VansService;
  let prisma: PrismaService;

  const mockUser: User = {
    name: 'mocked-user',
    email: 'mocked@email.com',
    password: '$2b$10$uNM8b2q8kq6I8Xo5fk11v.m/bmsTwnc6WtG3hrzTV7O2Vw09iPLr6',
    role: 'CONSUMER',
    id: '1',
  };

  const mockVans: Van[] = [
    {
      id: '2',
      name: 'mockVan2',
      price: 10,
      hostId: mockUser.id,
      type: 'luxury',
    },
    {
      id: '3',
      name: 'updatedMock',
      price: 20,
      hostId: mockUser.id,
      type: 'simple',
    },
    {
      id: '4',
      name: 'mockVan4',
      price: 30,
      hostId: mockUser.id,
      type: 'rugged',
    },
  ];

  const mockVan = mockVans[0];
  const updatedVan = mockVans[1];

  const mockPrisma = {
    user: {
      findUnique: jest.fn().mockResolvedValue(mockUser),
    },
    van: {
      findMany: jest.fn().mockResolvedValue(mockVans),
      findUnique: jest.fn().mockResolvedValue(mockVan),
      create: jest.fn().mockResolvedValue(mockVan),
      update: jest.fn().mockResolvedValue(updatedVan),
      delete: jest.fn().mockResolvedValue(mockVan),
    },
  };

  const mockDecodedJwt: DecodedJwt = {
    email: mockUser.email,
    iat: 1,
    role: mockUser.role,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VansService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<VansService>(VansService);
  });

  describe('listAllVans', () => {
    it('should list all vans', async () => {
      const vans = await service.listAllVans('4', '1');

      expect(vans).toEqual(mockVans);
    });
  });

  describe('getVanById', () => {
    it('should return unique van', async () => {
      const van = await service.getVanById('4');

      expect(van).toEqual(mockVan);
    });
  });

  describe('authorizedHost', () => {
    it('should check if host user exists', async () => {
      const host = await service.authorizedHost('mocked@email.com');

      expect(host).toEqual(mockUser);
    });
  });

  describe('addVan', () => {
    it('should add a new van and return it', async () => {
      const van = await service.addVan(
        {
          name: 'mockName',
          description: 'mockDescription',
          imageUrl: 'mockImage',
          price: 10,
          type: 'rugged',
          photos: ['mockPhoto'],
        },
        mockDecodedJwt,
      );
      expect(van).toEqual(mockVan);
    });
  });

  describe('updateVan', () => {
    it('should update a van and return it', async () => {
      const van = await service.updateVan(
        {
          name: 'mockName',
          description: 'mockDescription',
          imageUrl: 'mockImage',
          price: 10,
          type: 'rugged',
          photos: ['mockPhoto'],
        },
        mockDecodedJwt,
        '3',
      );
      expect(van).toEqual(updatedVan);
    });
  });

  describe('deleteVan', () => {
    it('should delete a van and return true', async () => {
      const van = await service.deleteVan(mockDecodedJwt, '4');
      expect(van).toBeTruthy();
    });
  });
});
