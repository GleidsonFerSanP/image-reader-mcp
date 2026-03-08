"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFileExists = validateFileExists;
exports.validateUrl = validateUrl;
exports.validateFormat = validateFormat;
exports.validateBuffer = validateBuffer;
const fs_1 = require("fs");
const format_detector_1 = require("./format-detector");
/**
 * Validates if a file path exists
 * @param filePath - File path to validate
 * @throws Error if file doesn't exist
 */
function validateFileExists(filePath) {
    if (!(0, fs_1.existsSync)(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }
}
/**
 * Validates if a URL is valid
 * @param url - URL to validate
 * @throws Error if URL is invalid
 */
function validateUrl(url) {
    try {
        new URL(url);
    }
    catch {
        throw new Error(`Invalid URL: ${url}`);
    }
}
/**
 * Validates image format
 * @param format - Image format
 * @throws Error if format is not supported
 */
function validateFormat(format) {
    if (!(0, format_detector_1.isFormatSupported)(format)) {
        throw new Error(`Unsupported image format: ${format}`);
    }
}
/**
 * Validates buffer is not empty
 * @param buffer - Buffer to validate
 * @throws Error if buffer is empty
 */
function validateBuffer(buffer) {
    if (buffer.length === 0) {
        throw new Error('Empty buffer provided');
    }
}
//# sourceMappingURL=validators.js.map