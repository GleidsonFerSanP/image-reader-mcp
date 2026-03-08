import { DomainError } from './domain-error';

/**
 * Error thrown when image reading fails
 */
export class ImageReadError extends DomainError {
  constructor(
    message: string,
    public readonly source: string,
    cause?: Error
  ) {
    super(message, { source }, cause);
  }
}
