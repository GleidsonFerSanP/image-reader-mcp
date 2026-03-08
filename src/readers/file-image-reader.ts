import { readFile } from 'fs/promises';
import sharp from 'sharp';
import { IImageReader } from './image-reader.interface';
import { ImageData } from '../types/image-data';
import { ImageReadError, ImageFormatError } from '../errors';
import {
  detectFormatFromBuffer,
  detectFormatFromPath,
  isFormatSupported,
  SUPPORTED_FORMATS
} from '../utils/format-detector';
import { validateFileExists, validateBuffer } from '../utils/validators';
import { validateFileSize } from '../utils/size-limiter';

/**
 * Reads images from local file system
 * Implements IImageReader contract
 */
export class FileImageReader implements IImageReader {
  /**
   * Reads an image from a file path
   * @param source - File path
   * @returns Promise resolving to ImageData
   * @throws ImageReadError if reading fails
   * @throws ImageFormatError if format is not supported
   */
  async read(source: string | Buffer): Promise<ImageData> {
    if (Buffer.isBuffer(source)) {
      throw new ImageReadError('FileImageReader expects a file path, not a Buffer', 'buffer');
    }

    try {
      // Validate file exists
      validateFileExists(source);

      // Read file
      const buffer = await readFile(source);
      validateBuffer(buffer);

      // Validate file size
      validateFileSize(buffer.length);

      // Detect format
      let format = detectFormatFromBuffer(buffer);
      if (!format) {
        format = detectFormatFromPath(source);
      }

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
        `Failed to read image from file: ${(error as Error).message}`,
        source,
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
