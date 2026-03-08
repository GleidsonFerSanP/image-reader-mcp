import { ImageData } from '../types/image-data';
import { ImageMetadata } from '../types/metadata-types';
/**
 * Interface for extracting metadata from images
 * All implementations must follow these contracts:
 * 1. Must return empty object if no metadata exists
 * 2. Must not fail if metadata is corrupted
 * 3. Must extract at least basic information (format, dimensions, size)
 * 4. Must normalize GPS data to decimal degrees
 * 5. Must handle different text encodings
 */
export interface IMetadataExtractor {
    /**
     * Extracts all available metadata from an image
     * @param image - Image data to extract metadata from
     * @returns Promise resolving to ImageMetadata
     */
    extract(image: ImageData): Promise<ImageMetadata>;
    /**
     * Checks if image contains metadata
     * @param image - Image data to check
     * @returns Promise resolving to true if metadata exists
     */
    hasMetadata(image: ImageData): Promise<boolean>;
}
//# sourceMappingURL=metadata-extractor.interface.d.ts.map