import { Test, TestingModule } from '@nestjs/testing';
import { VansController } from './vans.controller';

describe('VansController', () => {
  let controller: VansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VansController],
    }).compile();

    controller = module.get<VansController>(VansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
