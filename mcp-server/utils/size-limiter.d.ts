/**
 * Default maximum file size (50MB)
 */
export declare const DEFAULT_MAX_FILE_SIZE: number;
/**
 * Validates file size against maximum limit
 * @param size - File size in bytes
 * @param maxSize - Maximum allowed size (default: 50MB)
 * @throws Error if size exceeds limit
 */
export declare function validateFileSize(size: number, maxSize?: number): void;
/**
 * Formats bytes to human-readable string
 * @param bytes - Number of bytes
 * @returns Formatted string (e.g., "10.5 MB")
 */
export declare function formatBytes(bytes: number): string;
//# sourceMappingURL=size-limiter.d.ts.map