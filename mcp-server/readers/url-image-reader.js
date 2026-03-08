"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLImageReader = void 0;
const axios_1 = __importDefault(require("axios"));
const sharp_1 = __importDefault(require("sharp"));
const errors_1 = require("../errors");
const format_detector_1 = require("../utils/format-detector");
const validators_1 = require("../utils/validators");
const size_limiter_1 = require("../utils/size-limiter");
/**
 * Reads images from URLs (HTTP/HTTPS)
 * Implements IImageReader contract
 */
class URLImageReader {
    /**
     * Reads an image from a URL
     * @param source - Image URL
     * @returns Promise resolving to ImageData
     * @throws ImageReadError if reading fails
     * @throws ImageFormatError if format is not supported
     */
    async read(source) {
        if (Buffer.isBuffer(source)) {
            throw new errors_1.ImageReadError('URLImageReader expects a URL string, not a Buffer', 'buffer');
        }
        try {
            // Validate URL
            (0, validators_1.validateUrl)(source);
            // Download image
            const response = await axios_1.default.get(source, {
                responseType: 'arraybuffer',
                timeout: 30000, // 30 seconds timeout
                maxContentLength: 52428800, // 50MB max
                headers: {
                    'User-Agent': 'MCP-Image-Reader/0.1.0'
                }
            });
            const buffer = Buffer.from(response.data);
            (0, validators_1.validateBuffer)(buffer);
            // Validate file size
            (0, size_limiter_1.validateFileSize)(buffer.length);
            // Detect format (try multiple methods)
            let format = (0, format_detector_1.detectFormatFromBuffer)(buffer);
            if (!format && response.headers['content-type']) {
                format = (0, format_detector_1.mimeTypeToFormat)(response.headers['content-type']);
            }
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
            if (axios_1.default.isAxiosError(error)) {
                throw new errors_1.ImageReadError(`Failed to download image from URL: ${error.message}`, source, error);
            }
            throw new errors_1.ImageReadError(`Failed to read image from URL: ${error.message}`, source, error);
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
exports.URLImageReader = URLImageReader;
//# sourceMappingURL=url-image-reader.js.map