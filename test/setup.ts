/**
 * Test Setup
 * Global test configuration and utilities
 */

import { Buffer } from 'buffer';

// Mock console methods for cleaner test output
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Test timeout
jest.setTimeout(10000);

// Helper to create test images
export function createTestImageBuffer(
  width: number = 100,
  height: number = 100,
  format: 'png' | 'jpeg' = 'png'
): Buffer {
  // Simple PNG header for testing
  if (format === 'png') {
    return Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, // PNG signature
      0x00, 0x00, 0x00, 0x0d, // IHDR length
      0x49, 0x48, 0x44, 0x52, // IHDR
      ...Buffer.from([width >> 24, width >> 16, width >> 8, width]),
      ...Buffer.from([height >> 24, height >> 16, height >> 8, height]),
      0x08, 0x06, 0x00, 0x00, 0x00, // bit depth, color type, compression, filter, interlace
    ]);
  }

  // Simple JPEG header for testing
  return Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, // JPEG SOI + APP0
    0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, // JFIF
  ]);
}

// Helper for async error testing
export async function expectAsyncError(
  fn: () => Promise<any>,
  errorType?: new (...args: any[]) => Error
): Promise<Error> {
  try {
    await fn();
    throw new Error('Expected function to throw an error');
  } catch (error) {
    if (errorType && !(error instanceof errorType)) {
      throw new Error(
        `Expected error of type ${errorType.name}, got ${(error as Error).constructor.name}`
      );
    }
    return error as Error;
  }
}
