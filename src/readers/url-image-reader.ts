import axios from 'axios';
import sharp from 'sharp';
import { IImageReader } from './image-reader.interface';
import { ImageData } from '../types/image-data';
import { ImageReadError, ImageFormatError } from '../errors';
import {
  detectFormatFromBuffer,
  detectFormatFromPath,
  mimeTypeToFormat,
  isFormatSupported,
  SUPPORTED_FORMATS
} from '../utils/format-detector';
import { validateUrl, validateBuffer } from '../utils/validators';
import { validateFileSize } from '../utils/size-limiter';

/**
 * Reads images from URLs (HTTP/HTTPS)
 * Implements IImageReader contract
 */
export class URLImageReader implements IImageReader {
  /**
   * Reads an image from a URL
   * @param source - Image URL
   * @returns Promise resolving to ImageData
   * @throws ImageReadError if reading fails
   * @throws ImageFormatError if format is not supported
   */
  async read(source: string | Buffer): Promise<ImageData> {
    if (Buffer.isBuffer(source)) {
      throw new ImageReadError('URLImageReader expects a URL string, not a Buffer', 'buffer');
    }

    try {
      // Validate URL
      validateUrl(source);

      // Download image
      const response = await axios.get(source, {
        responseType: 'arraybuffer',
        timeout: 30000, // 30 seconds timeout
        maxContentLength: 52428800, // 50MB max
        headers: {
          'User-Agent': 'MCP-Image-Reader/0.1.0'
        }
      });

      const buffer = Buffer.from(response.data as ArrayBuffer);
      validateBuffer(buffer);

      // Validate file size
      validateFileSize(buffer.length);

      // Detect format (try multiple methods)
      let format = detectFormatFromBuffer(buffer);
      
      if (!format && response.headers['content-type']) {
        format = mimeTypeToFormat(response.headers['content-type'] as string);
      }
      
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
      
      if (axios.isAxiosError(error)) {
        throw new ImageReadError(
          `Failed to download image from URL: ${error.message}`,
          source,
          error
        );
      }

      throw new ImageReadError(
        `Failed to read image from URL: ${(error as Error).message}`,
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
