import { IImageReader } from './image-reader.interface';
import { ImageData } from '../types/image-data';
/**
 * Reads images from URLs (HTTP/HTTPS)
 * Implements IImageReader contract
 */
export declare class URLImageReader implements IImageReader {
    /**
     * Reads an image from a URL
     * @param source - Image URL
     * @returns Promise resolving to ImageData
     * @throws ImageReadError if reading fails
     * @throws ImageFormatError if format is not supported
     */
    read(source: string | Buffer): Promise<ImageData>;
    /**
     * Checks if the reader supports the specified format
     * @param format - Image format
     * @returns true if supported
     */
    supports(format: string): boolean;
}
//# sourceMappingURL=url-image-reader.d.ts.map