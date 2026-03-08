"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageFormatError = void 0;
const domain_error_1 = require("./domain-error");
/**
 * Error thrown when image format is not supported
 */
class ImageFormatError extends domain_error_1.DomainError {
    format;
    supportedFormats;
    constructor(format, supportedFormats) {
        super(`Unsupported image format: ${format}. Supported formats: ${supportedFormats.join(', ')}`, { format, supportedFormats });
        this.format = format;
        this.supportedFormats = supportedFormats;
    }
}
exports.ImageFormatError = ImageFormatError;
//# sourceMappingURL=image-format-error.js.map