/**
 * Basic image metadata always available
 */
export interface BasicMetadata {
  /** Image format */
  format: string;
  
  /** Width in pixels */
  width: number;
  
  /** Height in pixels */
  height: number;
  
  /** File size in bytes */
  size: number;
  
  /** Color space */
  colorSpace?: string;
  
  /** Has alpha channel */
  hasAlpha?: boolean;
  
  /** Bits per channel */
  depth?: number;
  
  /** Density/DPI */
  density?: number;
}

/**
 * GPS coordinate data
 */
export interface GPSData {
  /** Latitude in decimal degrees */
  latitude?: number;
  
  /** Longitude in decimal degrees */
  longitude?: number;
  
  /** Altitude in meters */
  altitude?: number;
  
  /** GPS timestamp */
  timestamp?: string;
}

/**
 * Camera settings data
 */
export interface CameraData {
  /** ISO speed */
  iso?: number;
  
  /** Focal length in mm */
  focalLength?: number;
  
  /** Aperture (f-number) */
  aperture?: number;
  
  /** Shutter speed in seconds */
  shutterSpeed?: number;
  
  /** Exposure compensation */
  exposureCompensation?: number;
  
  /** Flash fired */
  flash?: boolean;
  
  /** White balance */
  whiteBalance?: string;
}

/**
 * EXIF metadata
 */
export interface ExifData {
  /** Camera make */
  make?: string;
  
  /** Camera model */
  model?: string;
  
  /** Software used */
  software?: string;
  
  /** Date and time original */
  dateTime?: string;
  
  /** Date and time digitized */
  dateTimeDigitized?: string;
  
  /** GPS location data */
  gps?: GPSData;
  
  /** Camera settings */
  camera?: CameraData;
  
  /** Image orientation */
  orientation?: number;
  
  /** Copyright */
  copyright?: string;
  
  /** Artist/Author */
  artist?: string;
}

/**
 * IPTC metadata (journalism/press)
 */
export interface IptcData {
  /** Headline */
  headline?: string;
  
  /** Caption/description */
  caption?: string;
  
  /** Keywords */
  keywords?: string[];
  
  /** Copyright notice */
  copyright?: string;
  
  /** Creator/photographer */
  creator?: string;
  
  /** Credit */
  credit?: string;
  
  /** Source */
  source?: string;
}

/**
 * XMP metadata (Adobe eXtensible Metadata Platform)
 */
export interface XmpData {
  /** Title */
  title?: string;
  
  /** Description */
  description?: string;
  
  /** Subject/keywords */
  subject?: string[];
  
  /** Creator */
  creator?: string;
  
  /** Rights */
  rights?: string;
  
  /** Rating (0-5) */
  rating?: number;
}

/**
 * Complete image metadata
 */
export interface ImageMetadata {
  /** Basic metadata (always present) */
  basic: BasicMetadata;
  
  /** EXIF metadata (optional) */
  exif?: ExifData;
  
  /** IPTC metadata (optional) */
  iptc?: IptcData;
  
  /** XMP metadata (optional) */
  xmp?: XmpData;
}
