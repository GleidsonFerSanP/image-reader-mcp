/**
 * Supported image formats
 */
export declare const SUPPORTED_FORMATS: readonly ["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "tiff", "tif", "avif"];
export type SupportedFormat = typeof SUPPORTED_FORMATS[number];
/**
 * Detects image format from buffer by checking magic numbers
 * @param buffer - Image buffer
 * @returns Detected format or null
 */
export declare function detectFormatFromBuffer(buffer: Buffer): string | null;
/**
 * Detects format from file extension
 * @param filePath - File path or URL
 * @returns Format or null
 */
export declare function detectFormatFromPath(filePath: string): string | null;
/**
 * Converts MIME type to format
 * @param mimeType - MIME type
 * @returns Format or null
 */
export declare function mimeTypeToFormat(mimeType: string): string | null;
/**
 * Checks if format is supported
 * @param format - Image format
 * @returns true if supported
 */
export declare function isFormatSupported(format: string): boolean;
//# sourceMappingURL=format-detector.d.ts.map