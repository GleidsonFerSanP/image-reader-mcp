"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileImageReader = void 0;
const promises_1 = require("fs/promises");
const sharp_1 = __importDefault(require("sharp"));
const errors_1 = require("../errors");
const format_detector_1 = require("../utils/format-detector");
const validators_1 = require("../utils/validators");
const size_limiter_1 = require("../utils/size-limiter");
/**
 * Reads images from local file system
 * Implements IImageReader contract
 */
class FileImageReader {
    /**
     * Reads an image from a file path
     * @param source - File path
     * @returns Promise resolving to ImageData
     * @throws ImageReadError if reading fails
     * @throws ImageFormatError if format is not supported
     */
    async read(source) {
        if (Buffer.isBuffer(source)) {
            throw new errors_1.ImageReadError('FileImageReader expects a file path, not a Buffer', 'buffer');
        }
        try {
            // Validate file exists
            (0, validators_1.validateFileExists)(source);
            // Read file
            const buffer = await (0, promises_1.readFile)(source);
            (0, validators_1.validateBuffer)(buffer);
            // Validate file size
            (0, size_limiter_1.validateFileSize)(buffer.length);
            // Detect format
            let format = (0, format_detector_1.detectFormatFromBuffer)(buffer);
            if (!format) {
                format = (0, format_detector_1.detectFormatFromPath)(source);
            }
            if (!format) {
                throw new errors_1.ImageFormatError('unknown', [...format_detector_1.SUPPORTED_FORMATS]);
            }
            if (!this.supports(format)) {
                throw new errors_1.ImageFormatError(format, [...format_detector_1.SUPPORTED_FORMATS]);
            }
            // Get image metadata using Sharp
            const metadata = await (0, sharp_1.default)(buffer).metadata();
            return {
                buffer,
                format,
                width: metadata.width || 0,
                height: metadata.height || 0,
                size: buffer.length,
                colorSpace: metadata.space,
                hasAlpha: metadata.hasAlpha
            };
        }
        catch (error) {
            if (error instanceof errors_1.ImageReadError || error instanceof errors_1.ImageFormatError) {
                throw error;
            }
            throw new errors_1.ImageReadError(`Failed to read image from file: ${error.message}`, source, error);
        }
    }
    /**
     * Checks if the reader supports the specified format
     * @param format - Image format
     * @returns true if supported
     */
    supports(format) {
        return (0, format_detector_1.isFormatSupported)(format);
    }
}
exports.FileImageReader = FileImageReader;
//# sourceMappingURL=file-image-reader.js.map