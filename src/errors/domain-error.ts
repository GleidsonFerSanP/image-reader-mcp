/**
 * Base class for all domain errors
 * Provides structured error information with context
 */
export class DomainError extends Error {
  constructor(
    message: string,
    public readonly context?: Record<string, unknown>,
    public readonly cause?: Error
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
  
  /**
   * Converts error to JSON for logging/serialization
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      context: this.context,
      cause: this.cause?.message,
      stack: this.stack
    };
  }
}
