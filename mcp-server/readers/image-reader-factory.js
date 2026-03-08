"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageReaderFactory = void 0;
const file_image_reader_1 = require("./file-image-reader");
const url_image_reader_1 = require("./url-image-reader");
const buffer_image_reader_1 = require("./buffer-image-reader");
/**
 * Factory for creating appropriate image reader based on source type
 * Implements Factory pattern
 */
class ImageReaderFactory {
    static fileReader = new file_image_reader_1.FileImageReader();
    static urlReader = new url_image_reader_1.URLImageReader();
    static bufferReader = new buffer_image_reader_1.BufferImageReader();
    static customReaders = new Map();
    /**
     * Gets appropriate reader for the given source
     * @param source - File path, URL, or Buffer
     * @returns IImageReader instance
     */
    static getReader(source) {
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
    static registerReader(prefix, reader) {
        this.customReaders.set(prefix, reader);
    }
    /**
     * Removes a custom reader
     * @param prefix - Source prefix to remove
     * @returns true if removed, false if not found
     */
    static unregisterReader(prefix) {
        return this.customReaders.delete(prefix);
    }
    /**
     * Gets all registered custom reader prefixes
     * @returns Array of prefixes
     */
    static getRegisteredPrefixes() {
        return Array.from(this.customReaders.keys());
    }
}
exports.ImageReaderFactory = ImageReaderFactory;
//# sourceMappingURL=image-reader-factory.js.map