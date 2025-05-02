import { Test, TestingModule } from '@nestjs/testing';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '../../../src/shared/exception-filters/global-exception-filter';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';

describe('GlobalExceptionFilter', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: APP_FILTER,
          useClass: GlobalExceptionFilter,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle HttpException and return proper response', async () => {
    app.use((req, res, next) => {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    });

    await request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.FORBIDDEN)
      .expect((res) => {
        expect(res.body).toEqual({
          statusCode: HttpStatus.FORBIDDEN,
          timestamp: expect.any(String),
          path: '/',
          message: 'Forbidden',
        });
      });
  });

  it('should handle unknown exceptions and return internal server error', async () => {
    app.use((req, res, next) => {
      throw new Error('Unknown error');
    });

    await request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.INTERNAL_SERVER_ERROR)
      .expect((res) => {
        expect(res.body).toEqual({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          timestamp: expect.any(String),
          path: '/',
          message: 'Internal server error',
        });
      });
  });
});
