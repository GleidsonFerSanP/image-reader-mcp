/**
 * Default maximum file size (50MB)
 */
export const DEFAULT_MAX_FILE_SIZE = 50 * 1024 * 1024;

/**
 * Validates file size against maximum limit
 * @param size - File size in bytes
 * @param maxSize - Maximum allowed size (default: 50MB)
 * @throws Error if size exceeds limit
 */
export function validateFileSize(size: number, maxSize: number = DEFAULT_MAX_FILE_SIZE): void {
  if (size > maxSize) {
    throw new Error(
      `File size ${formatBytes(size)} exceeds maximum allowed size of ${formatBytes(maxSize)}`
    );
  }
}

/**
 * Formats bytes to human-readable string
 * @param bytes - Number of bytes
 * @returns Formatted string (e.g., "10.5 MB")
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
