import { Test, TestingModule } from '@nestjs/testing';
import { TranscriptService } from '../../src/transcript/transcript.service';
import { TranscriptController } from '../../src/transcript/transcript.controller';
import { YouTubeApiService } from '../../src/transcript/youtube-api.service';
import { CacheModule } from '@nestjs/common';
import { RateLimiterModule } from 'nestjs-rate-limiter';

describe('TranscriptModule', () => {
  let transcriptService: TranscriptService;
  let transcriptController: TranscriptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register(),
        RateLimiterModule,
      ],
      providers: [
        TranscriptService,
        YouTubeApiService,
      ],
      controllers: [TranscriptController],
    }).compile();

    transcriptService = module.get<TranscriptService>(TranscriptService);
    transcriptController = module.get<TranscriptController>(TranscriptController);
  });

  it('should be defined', () => {
    expect(transcriptService).toBeDefined();
    expect(transcriptController).toBeDefined();
  });

  // Add more tests for the TranscriptService and TranscriptController here
});
