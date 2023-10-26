import { Test, TestingModule } from '@nestjs/testing';
import { FaceBookGraphApiService } from './face-book-graph-api.service';

describe('FaceBookGraphApiService', () => {
  let service: FaceBookGraphApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaceBookGraphApiService],
    }).compile();

    service = module.get<FaceBookGraphApiService>(FaceBookGraphApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
