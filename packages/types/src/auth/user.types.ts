import { z } from 'zod';

// Define the User interface without password
export interface User {
  id: string;
  email: string;
  displayName: string;
  bio?: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Define the partial user type for updates
export interface PartialUser {
  id?: string;
  email?: string;
  displayName?: string;
  bio?: string | null;
  avatarUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}