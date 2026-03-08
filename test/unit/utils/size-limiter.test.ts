/**
 * Tests for Size Limiter
 */

import { validateFileSize, formatBytes, DEFAULT_MAX_FILE_SIZE } from '@/utils/size-limiter';

describe('Size Limiter', () => {
  describe('validateFileSize', () => {
    it('should pass for file within size limit', () => {
      expect(() => validateFileSize(1024 * 1024)).not.toThrow(); // 1MB
    });

    it('should throw Error for file exceeding size limit', () => {
      const size = 51 * 1024 * 1024; // 51MB
      const maxSize = 50 * 1024 * 1024; // 50MB
      expect(() => validateFileSize(size, maxSize)).toThrow(Error);
    });

    it('should handle zero size', () => {
      expect(() => validateFileSize(0)).not.toThrow();
    });
  });

  describe('formatBytes', () => {
    it('should format bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toContain('KB');
    });
  });

  it('should export DEFAULT_MAX_FILE_SIZE', () => {
    expect(DEFAULT_MAX_FILE_SIZE).toBe(50 * 1024 * 1024);
  });
});
