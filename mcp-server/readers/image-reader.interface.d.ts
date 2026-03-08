import { ImageData } from '../types/image-data';
/**
 * Interface for reading images from different sources
 * All implementations must follow these contracts:
 * 1. Must return Promise for asynchronous operations
 * 2. Must validate image format before processing
 * 3. Must throw ImageReadError on failure
 * 4. Must support at least PNG, JPEG, GIF and WebP
 * 5. Must include validation of maximum file size
 */
export interface IImageReader {
    /**
     * Reads an image from a source (file path, URL, or Buffer)
     * @param source - File path, URL, or Buffer of the image
     * @returns Promise resolving to ImageData
     * @throws ImageReadError if reading fails
     * @throws ImageFormatError if format is not supported
     */
    read(source: string | Buffer): Promise<ImageData>;
    /**
     * Checks if the reader supports the specified format
     * @param format - Image format (png, jpg, gif, webp, etc)
     * @returns true if format is supported
     */
    supports(format: string): boolean;
}
//# sourceMappingURL=image-reader.interface.d.ts.map