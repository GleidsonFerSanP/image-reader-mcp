import { DomainError } from './domain-error';

/**
 * Error thrown when metadata extraction fails
 */
export class MetadataExtractionError extends DomainError {
  constructor(
    message: string,
    cause?: Error
  ) {
    super(message, {}, cause);
  }
}
