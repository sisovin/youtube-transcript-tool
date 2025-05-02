import { Test, TestingModule } from '@nestjs/testing';
import { LoggingInterceptor } from '../../../src/shared/interceptors/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('LoggingInterceptor', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: LoggingInterceptor,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should log requests', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await request(app.getHttpServer())
      .get('/')
      .expect(404);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('GET / 404'));
    consoleSpy.mockRestore();
  });
});
