import sharp from 'sharp';
import exifReader from 'exif-reader';
import { IMetadataExtractor } from './metadata-extractor.interface';
import { ImageData } from '../types/image-data';
import {
  ImageMetadata,
  BasicMetadata,
  ExifData,
  GPSData,
  CameraData
} from '../types/metadata-types';
import { MetadataExtractionError } from '../errors';

/**
 * EXIF metadata extractor implementation
 * Implements IMetadataExtractor contract
 */
export class ExifMetadataExtractor implements IMetadataExtractor {
  /**
   * Extracts all available metadata from an image
   * @param image - Image data to extract metadata from
   * @returns Promise resolving to ImageMetadata
   */
  async extract(image: ImageData): Promise<ImageMetadata> {
    try {
      const metadata = await sharp(image.buffer).metadata();

      const basicMetadata: BasicMetadata = {
        format: image.format,
        width: image.width,
        height: image.height,
        size: image.size,
        colorSpace: metadata.space,
        hasAlpha: metadata.hasAlpha,
        depth: typeof metadata.depth === 'string' ? parseInt(metadata.depth, 10) : metadata.depth,
        density: metadata.density
      };

      // Try to extract EXIF data
      let exifData: ExifData | undefined;
      if (metadata.exif) {
        try {
          exifData = this.parseExifData(metadata.exif);
        } catch (error) {
          // Silently fail if EXIF parsing fails (corrupt metadata)
          console.warn('Failed to parse EXIF data:', error);
        }
      }

      return {
        basic: basicMetadata,
        exif: exifData
      };
    } catch (error) {
      throw new MetadataExtractionError(
        `Failed to extract metadata: ${(error as Error).message}`,
        error as Error
      );
    }
  }

  /**
   * Checks if image contains metadata
   * @param image - Image data to check
   * @returns Promise resolving to true if metadata exists
   */
  async hasMetadata(image: ImageData): Promise<boolean> {
    try {
      const metadata = await sharp(image.buffer).metadata();
      return !!(metadata.exif || metadata.iptc || metadata.xmp);
    } catch {
      return false;
    }
  }

  /**
   * Parses EXIF buffer into structured ExifData
   * @param exifBuffer - Raw EXIF buffer
   * @returns ExifData object
   */
  private parseExifData(exifBuffer: Buffer): ExifData | undefined {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exif = exifReader(exifBuffer) as any;

      if (!exif) {
        return undefined;
      }

      const exifData: ExifData = {};

      // Basic information
      if (exif.Image) {
        exifData.make = exif.Image.Make;
        exifData.model = exif.Image.Model;
        exifData.software = exif.Image.Software;
        exifData.orientation = exif.Image.Orientation;
        exifData.copyright = exif.Image.Copyright;
        exifData.artist = exif.Image.Artist;

        // Parse dates
        if (exif.Image.DateTime) {
          exifData.dateTime = this.parseExifDate(exif.Image.DateTime);
        }
      }

      // EXIF-specific data
      if (exif.Photo) {
        if (exif.Photo.DateTimeOriginal) {
          exifData.dateTime = this.parseExifDate(exif.Photo.DateTimeOriginal);
        }
        if (exif.Photo.DateTimeDigitized) {
          exifData.dateTimeDigitized = this.parseExifDate(exif.Photo.DateTimeDigitized);
        }

        // Camera settings
        exifData.camera = this.parseCameraData(exif.Photo);
      }

      // GPS data
      if (exif.GPS) {
        exifData.gps = this.parseGPSData(exif.GPS);
      }

      return exifData;
    } catch (error) {
      // Return undefined if parsing fails
      return undefined;
    }
  }

  /**
   * Parses camera settings from EXIF Photo data
   * @param photo - EXIF Photo object
   * @returns CameraData object
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseCameraData(photo: any): CameraData | undefined {
    const camera: CameraData = {};

    if (photo.ISOSpeedRatings) {
      camera.iso = Array.isArray(photo.ISOSpeedRatings) 
        ? photo.ISOSpeedRatings[0] 
        : photo.ISOSpeedRatings;
    }

    if (photo.FocalLength) {
      camera.focalLength = photo.FocalLength;
    }

    if (photo.FNumber) {
      camera.aperture = photo.FNumber;
    }

    if (photo.ExposureTime) {
      camera.shutterSpeed = photo.ExposureTime;
    }

    if (photo.ExposureBiasValue) {
      camera.exposureCompensation = photo.ExposureBiasValue;
    }

    if (photo.Flash !== undefined) {
      camera.flash = !!(photo.Flash & 1); // Check if flash fired bit is set
    }

    if (photo.WhiteBalance !== undefined) {
      camera.whiteBalance = photo.WhiteBalance === 0 ? 'auto' : 'manual';
    }

    return Object.keys(camera).length > 0 ? camera : undefined;
  }

  /**
   * Parses GPS data from EXIF GPS object
   * Converts to decimal degrees
   * @param gpsData - EXIF GPS object
   * @returns GPSData object
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseGPSData(gpsData: any): GPSData | undefined {
    const gps: GPSData = {};

    // Parse latitude
    if (gpsData.GPSLatitude && gpsData.GPSLatitudeRef) {
      const lat = this.convertDMSToDecimal(
        gpsData.GPSLatitude[0],
        gpsData.GPSLatitude[1],
        gpsData.GPSLatitude[2]
      );
      gps.latitude = gpsData.GPSLatitudeRef === 'S' ? -lat : lat;
    }

    // Parse longitude
    if (gpsData.GPSLongitude && gpsData.GPSLongitudeRef) {
      const lon = this.convertDMSToDecimal(
        gpsData.GPSLongitude[0],
        gpsData.GPSLongitude[1],
        gpsData.GPSLongitude[2]
      );
      gps.longitude = gpsData.GPSLongitudeRef === 'W' ? -lon : lon;
    }

    // Parse altitude
    if (gpsData.GPSAltitude) {
      gps.altitude = gpsData.GPSAltitude;
      if (gpsData.GPSAltitudeRef === 1 && gps.altitude !== undefined) {
        gps.altitude = -gps.altitude; // Below sea level
      }
    }

    // Parse timestamp
    if (gpsData.GPSDateStamp && gpsData.GPSTimeStamp) {
      gps.timestamp = this.parseGPSTimestamp(gpsData.GPSDateStamp, gpsData.GPSTimeStamp);
    }

    return Object.keys(gps).length > 0 ? gps : undefined;
  }

  /**
   * Converts DMS (Degrees, Minutes, Seconds) to decimal degrees
   * @param degrees - Degrees
   * @param minutes - Minutes
   * @param seconds - Seconds
   * @returns Decimal degrees
   */
  private convertDMSToDecimal(degrees: number, minutes: number, seconds: number): number {
    return degrees + minutes / 60 + seconds / 3600;
  }

  /**
   * Parses EXIF date string to ISO 8601 format
   * @param exifDate - EXIF date string (format: "YYYY:MM:DD HH:MM:SS")
   * @returns ISO 8601 date string
   */
  private parseExifDate(exifDate: string): string {
    try {
      // EXIF format: "YYYY:MM:DD HH:MM:SS"
      const parts = exifDate.split(' ');
      if (parts.length === 2) {
        const datePart = parts[0].replace(/:/g, '-');
        return `${datePart}T${parts[1]}`;
      }
      return exifDate;
    } catch {
      return exifDate;
    }
  }

  /**
   * Parses GPS timestamp
   * @param dateStamp - GPS date stamp
   * @param timeStamp - GPS time stamp (array of [hours, minutes, seconds])
   * @returns ISO 8601 timestamp
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseGPSTimestamp(dateStamp: string, timeStamp: any[]): string {
    try {
      const date = dateStamp.replace(/:/g, '-');
      const hours = String(timeStamp[0]).padStart(2, '0');
      const minutes = String(timeStamp[1]).padStart(2, '0');
      const seconds = String(Math.floor(timeStamp[2])).padStart(2, '0');
      return `${date}T${hours}:${minutes}:${seconds}Z`;
    } catch {
      return dateStamp;
    }
  }
}
