import { DomainError } from './domain-error';
/**
 * Error thrown when image processing fails
 */
export declare class ImageProcessingError extends DomainError {
    readonly operation: string;
    constructor(message: string, operation: string, cause?: Error);
}
//# sourceMappingURL=image-processing-error.d.ts.map