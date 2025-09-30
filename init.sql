-- This file is used to initialize the PostgreSQL database
-- Currently empty as the DB schema will be handled by Prisma in later stories

-- Create extensions if they don't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";