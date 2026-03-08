import { IImageReader } from './image-reader.interface';
import { FileImageReader } from './file-image-reader';
import { URLImageReader } from './url-image-reader';
import { BufferImageReader } from './buffer-image-reader';

/**
 * Factory for creating appropriate image reader based on source type
 * Implements Factory pattern
 */
export class ImageReaderFactory {
  private static fileReader: IImageReader = new FileImageReader();
  private static urlReader: IImageReader = new URLImageReader();
  private static bufferReader: IImageReader = new BufferImageReader();
  private static customReaders: Map<string, IImageReader> = new Map();

  /**
   * Gets appropriate reader for the given source
   * @param source - File path, URL, or Buffer
   * @returns IImageReader instance
   */
  static getReader(source: string | Buffer): IImageReader {
    // Buffer source
    if (Buffer.isBuffer(source)) {
      return this.bufferReader;
    }

    // URL source (http:// or https://)
    if (source.startsWith('http://') || source.startsWith('https://')) {
      return this.urlReader;
    }

    // Check for custom reader by prefix
    for (const [prefix, reader] of this.customReaders.entries()) {
      if (source.startsWith(prefix)) {
        return reader;
      }
    }

    // Default to file reader
    return this.fileReader;
  }

  /**
   * Registers a custom reader for a specific prefix
   * Allows extending the factory with new reader types
   * @param prefix - Source prefix to match (e.g., "s3://", "ftp://")
   * @param reader - IImageReader implementation
   */
  static registerReader(prefix: string, reader: IImageReader): void {
    this.customReaders.set(prefix, reader);
  }

  /**
   * Removes a custom reader
   * @param prefix - Source prefix to remove
   * @returns true if removed, false if not found
   */
  static unregisterReader(prefix: string): boolean {
    return this.customReaders.delete(prefix);
  }

  /**
   * Gets all registered custom reader prefixes
   * @returns Array of prefixes
   */
  static getRegisteredPrefixes(): string[] {
    return Array.from(this.customReaders.keys());
  }
}
