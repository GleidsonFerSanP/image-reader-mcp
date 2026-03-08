/**
 * Tests for Format Detector
 */

import { detectFormatFromBuffer, isFormatSupported } from '@/utils/format-detector';

describe('Format Detector', () => {
  describe('detectFormatFromBuffer', () => {
    it('should detect PNG format', () => {
      const pngBuffer = Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
        0x00, 0x00, 0x00, 0x00
      ]);
      expect(detectFormatFromBuffer(pngBuffer)).toBe('png');
    });

    it('should detect JPEG format', () => {
      const jpegBuffer = Buffer.from([
        0xff, 0xd8, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00
      ]);
      expect(detectFormatFromBuffer(jpegBuffer)).toBe('jpeg');
    });

    it('should detect WebP format', () => {
      const webpBuffer = Buffer.from([
        0x52, 0x49, 0x46, 0x46, // RIFF
        0x00, 0x00, 0x00, 0x00, // size
        0x57, 0x45, 0x42, 0x50, // WEBP
      ]);
      expect(detectFormatFromBuffer(webpBuffer)).toBe('webp');
    });

    it('should detect GIF format', () => {
      const gifBuffer = Buffer.from([
        0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00
      ]); // GIF89a
      expect(detectFormatFromBuffer(gifBuffer)).toBe('gif');
    });

    it('should return null for unknown format', () => {
      const unknownBuffer = Buffer.from([
        0x00, 0x01, 0x02, 0x03, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00
      ]);
      expect(detectFormatFromBuffer(unknownBuffer)).toBeNull();
    });

    it('should return null for empty buffer', () => {
      const emptyBuffer = Buffer.from([]);
      expect(detectFormatFromBuffer(emptyBuffer)).toBeNull();
    });
  });

  describe('isFormatSupported', () => {
    it('should return true for supported formats', () => {
      expect(isFormatSupported('png')).toBe(true);
      expect(isFormatSupported('jpeg')).toBe(true);
      expect(isFormatSupported('webp')).toBe(true);
    });

    it('should return false for unsupported formats', () => {
      expect(isFormatSupported('pdf')).toBe(false);
    });
  });
});
