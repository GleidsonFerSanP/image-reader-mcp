import { IImageReader } from './image-reader.interface';
import { ImageData } from '../types/image-data';
/**
 * Reads images from local file system
 * Implements IImageReader contract
 */
export declare class FileImageReader implements IImageReader {
    /**
     * Reads an image from a file path
     * @param source - File path
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
//# sourceMappingURL=file-image-reader.d.ts.map