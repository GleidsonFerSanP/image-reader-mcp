import { DomainError } from './domain-error';
/**
 * Error thrown when image reading fails
 */
export declare class ImageReadError extends DomainError {
    readonly source: string;
    constructor(message: string, source: string, cause?: Error);
}
//# sourceMappingURL=image-read-error.d.ts.map