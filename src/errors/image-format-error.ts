import { DomainError } from './domain-error';

/**
 * Error thrown when image format is not supported
 */
export class ImageFormatError extends DomainError {
  constructor(
    public readonly format: string,
    public readonly supportedFormats: string[]
  ) {
    super(
      `Unsupported image format: ${format}. Supported formats: ${supportedFormats.join(', ')}`,
      { format, supportedFormats }
    );
  }
}
