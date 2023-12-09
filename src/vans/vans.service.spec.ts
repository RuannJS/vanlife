import { Test, TestingModule } from '@nestjs/testing';
import { VansService } from './vans.service';

describe('VansService', () => {
  let service: VansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VansService],
    }).compile();

    service = module.get<VansService>(VansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
