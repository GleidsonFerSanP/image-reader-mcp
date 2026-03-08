import sharp, { Sharp } from 'sharp';
import { IImageProcessor } from './image-processor.interface';
import { ImageData, ResizeOptions, OptimizeOptions, ConvertOptions } from '../types/image-data';
import { ImageProcessingError } from '../errors';

/**
 * Image processor implementation using Sharp library
 * Implements IImageProcessor contract with high-performance operations
 */
export class SharpImageProcessor implements IImageProcessor {
  /**
   * Resizes an image while maintaining aspect ratio
   * @param image - Source image data
   * @param options - Resize options
   * @returns Promise resolving to resized ImageData
   */
  async resize(image: ImageData, options: ResizeOptions): Promise<ImageData> {
    try {
      const { width, height, fit = 'contain', maintainAspectRatio = true, background } = options;

      if (!width && !height) {
        throw new Error('At least one of width or height must be specified');
      }

      let processor: Sharp = sharp(image.buffer);

      if (maintainAspectRatio) {
        processor = processor.resize(width, height, {
          fit,
          background: background || { r: 255, g: 255, b: 255, alpha: 0 }
        });
      } else {
        processor = processor.resize(width, height, {
          fit: 'fill'
        });
      }

      const outputBuffer = await processor.toBuffer();
      const metadata = await sharp(outputBuffer).metadata();

      return {
        buffer: outputBuffer,
        format: image.format,
        width: metadata.width || width || image.width,
        height: metadata.height || height || image.height,
        size: outputBuffer.length,
        colorSpace: metadata.space,
        hasAlpha: metadata.hasAlpha
      };
    } catch (error) {
      throw new ImageProcessingError(
        `Failed to resize image: ${(error as Error).message}`,
        'resize',
        error as Error
      );
    }
  }

  /**
   * Converts image to another format
   * @param image - Source image data
   * @param options - Conversion options
   * @returns Promise resolving to converted ImageData
   */
  async convert(image: ImageData, options: ConvertOptions): Promise<ImageData> {
    try {
      const { format, quality = 85, compression } = options;

      let processor: Sharp = sharp(image.buffer);

      // Convert to target format
      switch (format.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        processor = processor.jpeg({ quality });
        break;
      case 'png':
        processor = processor.png({ 
          compressionLevel: compression || 6,
          quality 
        });
        break;
      case 'webp':
        processor = processor.webp({ quality });
        break;
      case 'avif':
        processor = processor.avif({ quality });
        break;
      case 'tiff':
      case 'tif':
        processor = processor.tiff({ quality, compression: 'jpeg' });
        break;
      case 'gif':
        processor = processor.gif();
        break;
      default:
        throw new Error(`Unsupported conversion format: ${format}`);
      }

      const outputBuffer = await processor.toBuffer();
      const metadata = await sharp(outputBuffer).metadata();

      return {
        buffer: outputBuffer,
        format: format === 'jpg' ? 'jpeg' : format,
        width: metadata.width || image.width,
        height: metadata.height || image.height,
        size: outputBuffer.length,
        colorSpace: metadata.space,
        hasAlpha: metadata.hasAlpha
      };
    } catch (error) {
      throw new ImageProcessingError(
        `Failed to convert image to ${options.format}: ${(error as Error).message}`,
        'convert',
        error as Error
      );
    }
  }

  /**
   * Converts image to base64 string
   * @param image - Source image data
   * @returns Promise resolving to base64 encoded string
   */
  async toBase64(image: ImageData): Promise<string> {
    try {
      return image.buffer.toString('base64');
    } catch (error) {
      throw new ImageProcessingError(
        `Failed to convert image to base64: ${(error as Error).message}`,
        'toBase64',
        error as Error
      );
    }
  }

  /**
   * Optimizes image by reducing size without significant quality loss
   * @param image - Source image data
   * @param options - Optimization options
   * @returns Promise resolving to optimized ImageData
   */
  async optimize(image: ImageData, options: OptimizeOptions = {}): Promise<ImageData> {
    try {
      const { quality = 85, progressive = true, stripMetadata = false } = options;

      let processor: Sharp = sharp(image.buffer);

      // Apply format-specific optimization
      switch (image.format.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        processor = processor.jpeg({ 
          quality,
          progressive,
          mozjpeg: true // Use MozJPEG for better compression
        });
        break;
      case 'png':
        processor = processor.png({ 
          compressionLevel: 9,
          quality,
          progressive
        });
        break;
      case 'webp':
        processor = processor.webp({ 
          quality,
          effort: 6 // Maximum effort for better compression
        });
        break;
      case 'avif':
        processor = processor.avif({ 
          quality,
          effort: 9
        });
        break;
      default:
        // For other formats, just pass through
        return image;
      }

      // Strip metadata if requested
      if (stripMetadata) {
        processor = processor.withMetadata({ 
          orientation: undefined 
        });
      }

      const outputBuffer = await processor.toBuffer();
      const metadata = await sharp(outputBuffer).metadata();

      return {
        buffer: outputBuffer,
        format: image.format,
        width: metadata.width || image.width,
        height: metadata.height || image.height,
        size: outputBuffer.length,
        colorSpace: metadata.space,
        hasAlpha: metadata.hasAlpha
      };
    } catch (error) {
      throw new ImageProcessingError(
        `Failed to optimize image: ${(error as Error).message}`,
        'optimize',
        error as Error
      );
    }
  }
}
