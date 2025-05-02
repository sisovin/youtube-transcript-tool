import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { PrismaService } from '../../../src/prisma/prisma.service';

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (POST)', () => {
    it('should create a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({ email: 'test@example.com', name: 'Test User' })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe('test@example.com');
      expect(response.body.name).toBe('Test User');
    });
  });

  describe('/users (GET)', () => {
    it('should return an array of users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return a user by ID', async () => {
      const user = await prisma.user.create({
        data: { email: 'test2@example.com', name: 'Test User 2' },
      });

      const response = await request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', user.id);
      expect(response.body.email).toBe('test2@example.com');
      expect(response.body.name).toBe('Test User 2');
    });
  });

  describe('/users/:id (PUT)', () => {
    it('should update a user by ID', async () => {
      const user = await prisma.user.create({
        data: { email: 'test3@example.com', name: 'Test User 3' },
      });

      const response = await request(app.getHttpServer())
        .put(`/users/${user.id}`)
        .send({ name: 'Updated User 3' })
        .expect(200);

      expect(response.body).toHaveProperty('id', user.id);
      expect(response.body.name).toBe('Updated User 3');
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete a user by ID', async () => {
      const user = await prisma.user.create({
        data: { email: 'test4@example.com', name: 'Test User 4' },
      });

      await request(app.getHttpServer())
        .delete(`/users/${user.id}`)
        .expect(204);

      const deletedUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      expect(deletedUser).toBeNull();
    });
  });
});
