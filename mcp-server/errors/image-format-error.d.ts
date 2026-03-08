import { DomainError } from './domain-error';
/**
 * Error thrown when image format is not supported
 */
export declare class ImageFormatError extends DomainError {
    readonly format: string;
    readonly supportedFormats: string[];
    constructor(format: string, supportedFormats: string[]);
}
//# sourceMappingURL=image-format-error.d.ts.map