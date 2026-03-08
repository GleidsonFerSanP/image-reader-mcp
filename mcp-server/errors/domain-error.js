"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
/**
 * Base class for all domain errors
 * Provides structured error information with context
 */
class DomainError extends Error {
    context;
    cause;
    constructor(message, context, cause) {
        super(message);
        this.context = context;
        this.cause = cause;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
    /**
     * Converts error to JSON for logging/serialization
     */
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            context: this.context,
            cause: this.cause?.message,
            stack: this.stack
        };
    }
}
exports.DomainError = DomainError;
//# sourceMappingURL=domain-error.js.map