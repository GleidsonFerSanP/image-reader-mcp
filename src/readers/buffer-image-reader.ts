import sharp from 'sharp';
import { IImageReader } from './image-reader.interface';
import { ImageData } from '../types/image-data';
import { ImageReadError, ImageFormatError } from '../errors';
import {
  detectFormatFromBuffer,
  isFormatSupported,
  SUPPORTED_FORMATS
} from '../utils/format-detector';
import { validateBuffer } from '../utils/validators';
import { validateFileSize } from '../utils/size-limiter';

/**
 * Reads images from Buffer
 * Implements IImageReader contract
 */
export class BufferImageReader implements IImageReader {
  /**
   * Reads an image from a Buffer
   * @param source - Image buffer
   * @returns Promise resolving to ImageData
   * @throws ImageReadError if reading fails
   * @throws ImageFormatError if format is not supported
   */
  async read(source: string | Buffer): Promise<ImageData> {
    if (!Buffer.isBuffer(source)) {
      throw new ImageReadError('BufferImageReader expects a Buffer, not a string', 'string');
    }

    try {
      const buffer = source;
      validateBuffer(buffer);

      // Validate file size
      validateFileSize(buffer.length);

      // Detect format from buffer
      const format = detectFormatFromBuffer(buffer);

      if (!format) {
        throw new ImageFormatError('unknown', [...SUPPORTED_FORMATS]);
      }

      if (!this.supports(format)) {
        throw new ImageFormatError(format, [...SUPPORTED_FORMATS]);
      }

      // Get image metadata using Sharp
      const metadata = await sharp(buffer).metadata();

      return {
        buffer,
        format,
        width: metadata.width || 0,
        height: metadata.height || 0,
        size: buffer.length,
        colorSpace: metadata.space,
        hasAlpha: metadata.hasAlpha
      };
    } catch (error) {
      if (error instanceof ImageReadError || error instanceof ImageFormatError) {
        throw error;
      }
      throw new ImageReadError(
        `Failed to read image from buffer: ${(error as Error).message}`,
        'buffer',
        error as Error
      );
    }
  }

  /**
   * Checks if the reader supports the specified format
   * @param format - Image format
   * @returns true if supported
   */
  supports(format: string): boolean {
    return isFormatSupported(format);
  }
}
