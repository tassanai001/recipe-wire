import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(PrismaService)
    .useValue({
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      }
    })
    .compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /v1/auth/signup', () => {
    const signupData = {
      email: 'test@example.com',
      password: 'Password123',
      displayName: 'Test User',
      bio: 'Test bio',
    };

    it('should create user and return 201', async () => {
      // Mock that user doesn't exist yet
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      // Mock user creation
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        displayName: 'Test User',
        bio: 'Test bio',
        avatarUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send(signupData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe('test@example.com');
      expect(response.body).not.toHaveProperty('passwordHash'); // Ensure password hash is not returned
      expect(response.body.displayName).toBe('Test User');
      expect(response.body.message).toBe('User registered successfully');
    });

    it('should return 409 for duplicate email', async () => {
      // Mock that user already exists
      const existingUser = { id: '1', email: 'test@example.com', displayName: 'Test User', passwordHash: 'hashed' };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

      await request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send(signupData)
        .expect(409)
        .expect(res => {
          expect(res.body.message).toBe('Email already exists');
        });
    });

    it('should return 400 for invalid email', async () => {
      const invalidData = {
        ...signupData,
        email: 'invalid-email',
      };

      await request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send(invalidData)
        .expect(400);
    });

    it('should return 400 for weak password (too short)', async () => {
      const weakPasswordData = {
        ...signupData,
        password: 'weak',
      };

      await request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send(weakPasswordData)
        .expect(400);
    });

    it('should return 400 for weak password (no number)', async () => {
      const weakPasswordData = {
        ...signupData,
        password: 'Password',
      };

      await request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send(weakPasswordData)
        .expect(400);
    });

    it('should return 400 for weak password (no letter)', async () => {
      const weakPasswordData = {
        ...signupData,
        password: '12345678',
      };

      await request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send(weakPasswordData)
        .expect(400);
    });

    it('should return 400 for display name too short', async () => {
      const shortNameData = {
        ...signupData,
        displayName: 'A',
      };

      await request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send(shortNameData)
        .expect(400);
    });

    it('should return 400 for display name too long', async () => {
      const longNameData = {
        ...signupData,
        displayName: 'A'.repeat(51), // 51 characters, exceeding max of 50
      };

      await request(app.getHttpServer())
        .post('/v1/auth/signup')
        .send(longNameData)
        .expect(400);
    });
  });
});