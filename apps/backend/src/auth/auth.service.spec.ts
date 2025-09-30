import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from '../dto/signup.dto';
import { ConflictException } from '@nestjs/common';
import { hashPassword } from '../utils/password.util';
import { User } from '@recipe-wire/types';

// Mock the password utility
jest.mock('../utils/password.util', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashedPassword123'),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockSignupDto: SignupDto = {
    email: 'test@example.com',
    password: 'Test1234',
    displayName: 'Test User',
    bio: 'Test bio',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user with hashed password', async () => {
      // Arrange
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
      const createdUser: User = {
        id: '1',
        email: 'test@example.com',
        displayName: 'Test User',
        bio: 'Test bio',
        avatarUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prismaService.user.create as jest.Mock).mockResolvedValue(createdUser);

      // Act
      const result = await service.signup(mockSignupDto);

      // Assert
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(hashPassword).toHaveBeenCalledWith('Test1234');
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          passwordHash: 'hashedPassword123',
          displayName: 'Test User',
          bio: 'Test bio',
        },
      });
      expect(result).toEqual(createdUser);
    });

    it('should throw ConflictException for duplicate email', async () => {
      // Arrange
      const existingUser = { id: '1', email: 'test@example.com', displayName: 'Test User', passwordHash: 'hashed' };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(existingUser);

      // Act & Assert
      await expect(service.signup(mockSignupDto)).rejects.toThrow(ConflictException);
      await expect(service.signup(mockSignupDto)).rejects.toThrow('Email already exists');
      expect(prismaService.user.create).not.toHaveBeenCalled();
    });

    it('should convert email to lowercase', async () => {
      // Arrange
      const signupDtoWithUppercase: SignupDto = { ...mockSignupDto, email: 'TEST@EXAMPLE.COM' };
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
      const createdUser: User = {
        id: '1',
        email: 'test@example.com',
        displayName: 'Test User',
        bio: 'Test bio',
        avatarUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prismaService.user.create as jest.Mock).mockResolvedValue(createdUser);

      // Act
      await service.signup(signupDtoWithUppercase);

      // Assert
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          passwordHash: 'hashedPassword123',
          displayName: 'Test User',
          bio: 'Test bio',
        },
      });
    });

    it('should not return password hash in response', async () => {
      // Arrange
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);
      const createdUser: User = {
        id: '1',
        email: 'test@example.com',
        displayName: 'Test User',
        bio: 'Test bio',
        avatarUrl: null,
        passwordHash: 'shouldNotBeReturned',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (prismaService.user.create as jest.Mock).mockResolvedValue(createdUser);

      // Act
      const result = await service.signup(mockSignupDto);

      // Assert
      expect(result).not.toHaveProperty('passwordHash');
    });
  });
});