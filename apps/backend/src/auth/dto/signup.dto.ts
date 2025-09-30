import { SignupSchema } from '@recipe-wire/types';
import { createZodDto } from 'nestjs-zod';

export class SignupDto extends createZodDto(SignupSchema) {}