"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataExtractionError = void 0;
const domain_error_1 = require("./domain-error");
/**
 * Error thrown when metadata extraction fails
 */
class MetadataExtractionError extends domain_error_1.DomainError {
    constructor(message, cause) {
        super(message, {}, cause);
    }
}
exports.MetadataExtractionError = MetadataExtractionError;
//# sourceMappingURL=metadata-extraction-error.js.map