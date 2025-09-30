import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { hashPassword } from './utils/password.util';
import { User } from '@recipe-wire/types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private prisma: PrismaService) {}

  async signup(dto: SignupDto): Promise<Omit<User, 'passwordHash'>> {
    const { email, password, displayName, bio } = dto;

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      this.logger.warn(`Signup attempt with duplicate email: ${email}`);
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        displayName,
        bio: bio || null,
      },
    });

    this.logger.log(`User registered: ${user.email}`);

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
