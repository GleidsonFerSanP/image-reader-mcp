import { IImageProcessor } from './image-processor.interface';
import { ImageData, ResizeOptions, OptimizeOptions, ConvertOptions } from '../types/image-data';
/**
 * Image processor implementation using Sharp library
 * Implements IImageProcessor contract with high-performance operations
 */
export declare class SharpImageProcessor implements IImageProcessor {
    /**
     * Resizes an image while maintaining aspect ratio
     * @param image - Source image data
     * @param options - Resize options
     * @returns Promise resolving to resized ImageData
     */
    resize(image: ImageData, options: ResizeOptions): Promise<ImageData>;
    /**
     * Converts image to another format
     * @param image - Source image data
     * @param options - Conversion options
     * @returns Promise resolving to converted ImageData
     */
    convert(image: ImageData, options: ConvertOptions): Promise<ImageData>;
    /**
     * Converts image to base64 string
     * @param image - Source image data
     * @returns Promise resolving to base64 encoded string
     */
    toBase64(image: ImageData): Promise<string>;
    /**
     * Optimizes image by reducing size without significant quality loss
     * @param image - Source image data
     * @param options - Optimization options
     * @returns Promise resolving to optimized ImageData
     */
    optimize(image: ImageData, options?: OptimizeOptions): Promise<ImageData>;
}
//# sourceMappingURL=sharp-image-processor.d.ts.map