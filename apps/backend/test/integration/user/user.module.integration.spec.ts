import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
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
    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (GET)', () => {
    it('should return an array of users', async () => {
      const response = await request(app.getHttpServer()).get('/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('/users (POST)', () => {
    it('should create a new user', async () => {
      const newUser = { email: 'test@example.com', name: 'Test User' };
      const response = await request(app.getHttpServer()).post('/users').send(newUser);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.name).toBe(newUser.name);
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return a user by ID', async () => {
      const user = await prisma.user.create({
        data: { email: 'test2@example.com', name: 'Test User 2' },
      });
      const response = await request(app.getHttpServer()).get(`/users/${user.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', user.id);
      expect(response.body.email).toBe(user.email);
      expect(response.body.name).toBe(user.name);
    });
  });

  describe('/users/:id (PUT)', () => {
    it('should update a user by ID', async () => {
      const user = await prisma.user.create({
        data: { email: 'test3@example.com', name: 'Test User 3' },
      });
      const updatedUser = { email: 'updated@example.com', name: 'Updated User' };
      const response = await request(app.getHttpServer()).put(`/users/${user.id}`).send(updatedUser);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', user.id);
      expect(response.body.email).toBe(updatedUser.email);
      expect(response.body.name).toBe(updatedUser.name);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete a user by ID', async () => {
      const user = await prisma.user.create({
        data: { email: 'test4@example.com', name: 'Test User 4' },
      });
      const response = await request(app.getHttpServer()).delete(`/users/${user.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', user.id);

      const deletedUser = await prisma.user.findUnique({ where: { id: user.id } });
      expect(deletedUser).toBeNull();
    });
  });
});
