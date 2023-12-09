import { Test, TestingModule } from '@nestjs/testing';
import { VansController } from './vans.controller';
import { VansService } from './vans.service';
import { Van } from './util/van.entity';
import { User } from '../user/util/user.entity';
import { DecodedJwt } from '../user/util/decoded-jwt';

describe('VansController', () => {
  let controller: VansController;
  let service: VansService;

  const mockUser: User = {
    name: 'mocked-user',
    email: 'mocked@email.com',
    password: '$2b$10$uNM8b2q8kq6I8Xo5fk11v.m/bmsTwnc6WtG3hrzTV7O2Vw09iPLr6',
    role: 'CONSUMER',
    id: '1',
  };

  const mockDecodedJwt: DecodedJwt = {
    email: mockUser.email,
    iat: 1,
    role: mockUser.role,
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VansController],
      providers: [
        {
          provide: VansService,
          useValue: {
            listAllVans: jest.fn().mockResolvedValue(mockVans),
            getVanById: jest.fn().mockResolvedValue(mockVan),
            listHostVans: jest.fn().mockResolvedValue(mockVans),
            addVan: jest.fn().mockResolvedValue(mockVan),
            updateVan: jest.fn().mockResolvedValue(updatedVan),
            deleteVan: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<VansController>(VansController);
    service = module.get<VansService>(VansService);
  });

  describe('listAllVans', () => {
    it('should list all vans', async () => {
      const vans = await controller.listAllVans('5', '1');

      expect(vans).toEqual(mockVans);
    });
  });

  describe('getVanById', () => {
    it('should return unique van', async () => {
      const van = await controller.getVanById('2');
      expect(van).toEqual(mockVan);
    });
  });

  describe('listHostVans', () => {
    it('should return vans from a host', async () => {
      const vans = await controller.listHostVans(mockDecodedJwt);

      expect(vans).toEqual(mockVans);
    });
  });

  describe('addVan', () => {
    it('should add a van and return it', async () => {
      const van = await controller.addVan(
        {
          name: 'mockVan',
          description: 'mockDesc',
          imageUrl: 'mockimg',
          photos: ['mock'],
          price: 10,
          type: 'luxury',
        },
        mockDecodedJwt,
      );
      expect(van).toEqual(mockVan);
    });
  });

  describe('updateVan', () => {
    it('should update a van and return it', async () => {
      const van = await controller.updateVan(
        { name: 'updated' },
        mockDecodedJwt,
        '3',
      );

      expect(van).toEqual(updatedVan);
    });
  });

  describe('deleteVan', () => {
    it('should delete a van and return true', async () => {
      const van = await controller.deleteVan(mockDecodedJwt, '3');

      expect(van).toBeTruthy();
    });
  });
});
