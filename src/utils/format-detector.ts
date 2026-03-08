/**
 * Supported image formats
 */
export const SUPPORTED_FORMATS = [
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'svg',
  'bmp',
  'tiff',
  'tif',
  'avif'
] as const;

export type SupportedFormat = typeof SUPPORTED_FORMATS[number];

/**
 * MIME type to format mapping
 */
const MIME_TO_FORMAT: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpeg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/bmp': 'bmp',
  'image/tiff': 'tiff',
  'image/avif': 'avif'
};

/**
 * Detects image format from buffer by checking magic numbers
 * @param buffer - Image buffer
 * @returns Detected format or null
 */
export function detectFormatFromBuffer(buffer: Buffer): string | null {
  if (buffer.length < 12) {
    return null;
  }

  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    return 'png';
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
    return 'jpeg';
  }

  // GIF: 47 49 46 38
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) {
    return 'gif';
  }

  // WebP: 52 49 46 46 ... 57 45 42 50
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
    return 'webp';
  }

  // BMP: 42 4D
  if (buffer[0] === 0x42 && buffer[1] === 0x4D) {
    return 'bmp';
  }

  // TIFF: 49 49 2A 00 or 4D 4D 00 2A
  if ((buffer[0] === 0x49 && buffer[1] === 0x49 && buffer[2] === 0x2A && buffer[3] === 0x00) ||
      (buffer[0] === 0x4D && buffer[1] === 0x4D && buffer[2] === 0x00 && buffer[3] === 0x2A)) {
    return 'tiff';
  }

  // SVG: Check for XML/SVG tags
  const str = buffer.toString('utf8', 0, Math.min(buffer.length, 100));
  if (str.includes('<svg') || str.includes('<?xml')) {
    return 'svg';
  }

  return null;
}

/**
 * Detects format from file extension
 * @param filePath - File path or URL
 * @returns Format or null
 */
export function detectFormatFromPath(filePath: string): string | null {
  const extension = filePath.split('.').pop()?.toLowerCase();
  if (!extension) {
    return null;
  }

  if (SUPPORTED_FORMATS.includes(extension as SupportedFormat)) {
    return extension === 'jpg' ? 'jpeg' : extension;
  }

  return null;
}

/**
 * Converts MIME type to format
 * @param mimeType - MIME type
 * @returns Format or null
 */
export function mimeTypeToFormat(mimeType: string): string | null {
  return MIME_TO_FORMAT[mimeType.toLowerCase()] || null;
}

/**
 * Checks if format is supported
 * @param format - Image format
 * @returns true if supported
 */
export function isFormatSupported(format: string): boolean {
  return SUPPORTED_FORMATS.includes(format.toLowerCase() as SupportedFormat);
}
