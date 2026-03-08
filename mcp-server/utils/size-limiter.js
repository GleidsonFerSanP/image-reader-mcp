"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MAX_FILE_SIZE = void 0;
exports.validateFileSize = validateFileSize;
exports.formatBytes = formatBytes;
/**
 * Default maximum file size (50MB)
 */
exports.DEFAULT_MAX_FILE_SIZE = 50 * 1024 * 1024;
/**
 * Validates file size against maximum limit
 * @param size - File size in bytes
 * @param maxSize - Maximum allowed size (default: 50MB)
 * @throws Error if size exceeds limit
 */
function validateFileSize(size, maxSize = exports.DEFAULT_MAX_FILE_SIZE) {
    if (size > maxSize) {
        throw new Error(`File size ${formatBytes(size)} exceeds maximum allowed size of ${formatBytes(maxSize)}`);
    }
}
/**
 * Formats bytes to human-readable string
 * @param bytes - Number of bytes
 * @returns Formatted string (e.g., "10.5 MB")
 */
function formatBytes(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
//# sourceMappingURL=size-limiter.js.map