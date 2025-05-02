import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { TranscriptService } from '../../../src/transcript/transcript.service';
import { YouTubeApiService } from '../../../src/transcript/youtube-api.service';

describe('TranscriptModule (Integration)', () => {
  let app: INestApplication;
  let transcriptService: TranscriptService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    transcriptService = moduleFixture.get<TranscriptService>(TranscriptService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fetch transcript successfully', async () => {
    const mockTranscript = { content: 'Sample transcript content' };
    jest.spyOn(transcriptService, 'fetchTranscript').mockResolvedValue(mockTranscript);

    const response = await request(app.getHttpServer())
      .get('/transcripts/1')
      .expect(200);

    expect(response.body).toEqual(mockTranscript);
  });

  it('should return 404 if transcript not found', async () => {
    jest.spyOn(transcriptService, 'fetchTranscript').mockResolvedValue(null);

    await request(app.getHttpServer())
      .get('/transcripts/999')
      .expect(404);
  });

  // Add more integration tests for other endpoints and scenarios here
});
