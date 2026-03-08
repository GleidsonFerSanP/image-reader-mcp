"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferImageReader = void 0;
const sharp_1 = __importDefault(require("sharp"));
const errors_1 = require("../errors");
const format_detector_1 = require("../utils/format-detector");
const validators_1 = require("../utils/validators");
const size_limiter_1 = require("../utils/size-limiter");
/**
 * Reads images from Buffer
 * Implements IImageReader contract
 */
class BufferImageReader {
    /**
     * Reads an image from a Buffer
     * @param source - Image buffer
     * @returns Promise resolving to ImageData
     * @throws ImageReadError if reading fails
     * @throws ImageFormatError if format is not supported
     */
    async read(source) {
        if (!Buffer.isBuffer(source)) {
            throw new errors_1.ImageReadError('BufferImageReader expects a Buffer, not a string', 'string');
        }
        try {
            const buffer = source;
            (0, validators_1.validateBuffer)(buffer);
            // Validate file size
            (0, size_limiter_1.validateFileSize)(buffer.length);
            // Detect format from buffer
            const format = (0, format_detector_1.detectFormatFromBuffer)(buffer);
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
            throw new errors_1.ImageReadError(`Failed to read image from buffer: ${error.message}`, 'buffer', error);
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
exports.BufferImageReader = BufferImageReader;
//# sourceMappingURL=buffer-image-reader.js.map