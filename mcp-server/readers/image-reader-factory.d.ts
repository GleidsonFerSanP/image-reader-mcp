import { IImageReader } from './image-reader.interface';
/**
 * Factory for creating appropriate image reader based on source type
 * Implements Factory pattern
 */
export declare class ImageReaderFactory {
    private static fileReader;
    private static urlReader;
    private static bufferReader;
    private static customReaders;
    /**
     * Gets appropriate reader for the given source
     * @param source - File path, URL, or Buffer
     * @returns IImageReader instance
     */
    static getReader(source: string | Buffer): IImageReader;
    /**
     * Registers a custom reader for a specific prefix
     * Allows extending the factory with new reader types
     * @param prefix - Source prefix to match (e.g., "s3://", "ftp://")
     * @param reader - IImageReader implementation
     */
    static registerReader(prefix: string, reader: IImageReader): void;
    /**
     * Removes a custom reader
     * @param prefix - Source prefix to remove
     * @returns true if removed, false if not found
     */
    static unregisterReader(prefix: string): boolean;
    /**
     * Gets all registered custom reader prefixes
     * @returns Array of prefixes
     */
    static getRegisteredPrefixes(): string[];
}
//# sourceMappingURL=image-reader-factory.d.ts.map