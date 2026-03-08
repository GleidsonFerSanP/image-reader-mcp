import { existsSync } from 'fs';
import { isFormatSupported } from './format-detector';

/**
 * Validates if a file path exists
 * @param filePath - File path to validate
 * @throws Error if file doesn't exist
 */
export function validateFileExists(filePath: string): void {
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
}

/**
 * Validates if a URL is valid
 * @param url - URL to validate
 * @throws Error if URL is invalid
 */
export function validateUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
}

/**
 * Validates image format
 * @param format - Image format
 * @throws Error if format is not supported
 */
export function validateFormat(format: string): void {
  if (!isFormatSupported(format)) {
    throw new Error(`Unsupported image format: ${format}`);
  }
}

/**
 * Validates buffer is not empty
 * @param buffer - Buffer to validate
 * @throws Error if buffer is empty
 */
export function validateBuffer(buffer: Buffer): void {
  if (buffer.length === 0) {
    throw new Error('Empty buffer provided');
  }
}
