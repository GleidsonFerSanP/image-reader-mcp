"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageReadError = void 0;
const domain_error_1 = require("./domain-error");
/**
 * Error thrown when image reading fails
 */
class ImageReadError extends domain_error_1.DomainError {
    source;
    constructor(message, source, cause) {
        super(message, { source }, cause);
        this.source = source;
    }
}
exports.ImageReadError = ImageReadError;
//# sourceMappingURL=image-read-error.js.map