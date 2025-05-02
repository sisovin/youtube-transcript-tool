import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { configureSwagger } from '../../../src/shared/swagger/swagger.config';

describe('Swagger Configuration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureSwagger(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create Swagger documentation', async () => {
    await request(app.getHttpServer())
      .get('/api-docs')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('YouTube Transcript Tool API');
      });
  });

  it('should include BearerAuth in Swagger documentation', async () => {
    await request(app.getHttpServer())
      .get('/api-docs')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('"type":"http","scheme":"bearer"');
      });
  });
});
