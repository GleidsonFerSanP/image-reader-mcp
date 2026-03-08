/**
 * Tests for Validators
 */

import {
  validateFileExists,
  validateUrl,
  validateFormat,
  validateBuffer
} from '@/utils/validators';
import * as fs from 'fs';

jest.mock('fs');

describe('Validators', () => {
  describe('validateFileExists', () => {
    it('should not throw for existing file', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      expect(() => validateFileExists('/path/to/file.jpg')).not.toThrow();
    });

    it('should throw for non-existing file', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      expect(() => validateFileExists('/path/to/missing.jpg')).toThrow('File not found');
    });
  });

  describe('validateUrl', () => {
    it('should not throw for valid URLs', () => {
      expect(() => validateUrl('http://example.com/image.jpg')).not.toThrow();
    });

    it('should throw for invalid URLs', () => {
      expect(() => validateUrl('not-a-url')).toThrow('Invalid URL');
    });
  });

  describe('validateFormat', () => {
    it('should not throw for supported formats', () => {
      expect(() => validateFormat('png')).not.toThrow();
    });

    it('should throw for unsupported formats', () => {
      expect(() => validateFormat('pdf')).toThrow('Unsupported image format');
    });
  });

  describe('validateBuffer', () => {
    it('should not throw for non-empty buffer', () => {
      const buffer = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
      expect(() => validateBuffer(buffer)).not.toThrow();
    });

    it('should throw for empty buffer', () => {
      const emptyBuffer = Buffer.from([]);
      expect(() => validateBuffer(emptyBuffer)).toThrow('Empty buffer');
    });
  });
});
