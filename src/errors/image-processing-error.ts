import { DomainError } from './domain-error';

/**
 * Error thrown when image processing fails
 */
export class ImageProcessingError extends DomainError {
  constructor(
    message: string,
    public readonly operation: string,
    cause?: Error
  ) {
    super(message, { operation }, cause);
  }
}
