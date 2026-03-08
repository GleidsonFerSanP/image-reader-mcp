"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessingError = void 0;
const domain_error_1 = require("./domain-error");
/**
 * Error thrown when image processing fails
 */
class ImageProcessingError extends domain_error_1.DomainError {
    operation;
    constructor(message, operation, cause) {
        super(message, { operation }, cause);
        this.operation = operation;
    }
}
exports.ImageProcessingError = ImageProcessingError;
//# sourceMappingURL=image-processing-error.js.map