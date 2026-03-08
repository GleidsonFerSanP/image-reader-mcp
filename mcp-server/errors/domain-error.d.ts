/**
 * Base class for all domain errors
 * Provides structured error information with context
 */
export declare class DomainError extends Error {
    readonly context?: Record<string, unknown> | undefined;
    readonly cause?: Error | undefined;
    constructor(message: string, context?: Record<string, unknown> | undefined, cause?: Error | undefined);
    /**
     * Converts error to JSON for logging/serialization
     */
    toJSON(): Record<string, unknown>;
}
//# sourceMappingURL=domain-error.d.ts.map