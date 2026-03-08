import { IImageReader } from './image-reader.interface';
import { ImageData } from '../types/image-data';
/**
 * Reads images from Buffer
 * Implements IImageReader contract
 */
export declare class BufferImageReader implements IImageReader {
    /**
     * Reads an image from a Buffer
     * @param source - Image buffer
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
//# sourceMappingURL=buffer-image-reader.d.ts.map