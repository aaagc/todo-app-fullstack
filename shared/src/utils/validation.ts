import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export async function validateDto<T extends object>(
  dtoClass: new () => T,
  data: unknown,
): Promise<ValidationResult> {
  const dto = plainToClass(dtoClass, data);
  const errors: ValidationError[] = await validate(dto);

  if (errors.length === 0) {
    return { isValid: true, errors: [] };
  }

  const errorMessages = errors.flatMap((error) =>
    Object.values(error.constraints || {}),
  );

  return { isValid: false, errors: errorMessages };
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}