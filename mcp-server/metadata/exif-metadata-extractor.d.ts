import { IMetadataExtractor } from './metadata-extractor.interface';
import { ImageData } from '../types/image-data';
import { ImageMetadata } from '../types/metadata-types';
/**
 * EXIF metadata extractor implementation
 * Implements IMetadataExtractor contract
 */
export declare class ExifMetadataExtractor implements IMetadataExtractor {
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
    /**
     * Parses EXIF buffer into structured ExifData
     * @param exifBuffer - Raw EXIF buffer
     * @returns ExifData object
     */
    private parseExifData;
    /**
     * Parses camera settings from EXIF Photo data
     * @param photo - EXIF Photo object
     * @returns CameraData object
     */
    private parseCameraData;
    /**
     * Parses GPS data from EXIF GPS object
     * Converts to decimal degrees
     * @param gpsData - EXIF GPS object
     * @returns GPSData object
     */
    private parseGPSData;
    /**
     * Converts DMS (Degrees, Minutes, Seconds) to decimal degrees
     * @param degrees - Degrees
     * @param minutes - Minutes
     * @param seconds - Seconds
     * @returns Decimal degrees
     */
    private convertDMSToDecimal;
    /**
     * Parses EXIF date string to ISO 8601 format
     * @param exifDate - EXIF date string (format: "YYYY:MM:DD HH:MM:SS")
     * @returns ISO 8601 date string
     */
    private parseExifDate;
    /**
     * Parses GPS timestamp
     * @param dateStamp - GPS date stamp
     * @param timeStamp - GPS time stamp (array of [hours, minutes, seconds])
     * @returns ISO 8601 timestamp
     */
    private parseGPSTimestamp;
}
//# sourceMappingURL=exif-metadata-extractor.d.ts.map