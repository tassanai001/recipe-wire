-- This file is used to initialize the PostgreSQL database
-- Enables required PostgreSQL extensions for the RecipeWire application

-- Create extensions if they don't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";