/**
 * Represents image data with metadata
 */
export interface ImageData {
  /** Image buffer */
  buffer: Buffer;
  
  /** Image format (png, jpeg, gif, webp, etc) */
  format: string;
  
  /** Image width in pixels */
  width: number;
  
  /** Image height in pixels */
  height: number;
  
  /** Base64 encoded string (optional) */
  base64?: string;
  
  /** File size in bytes */
  size: number;
  
  /** Color space (sRGB, RGB, CMYK, etc) */
  colorSpace?: string;
  
  /** Has alpha channel */
  hasAlpha?: boolean;
}

/**
 * Options for resizing images
 */
export interface ResizeOptions {
  /** Target width in pixels */
  width?: number;
  
  /** Target height in pixels */
  height?: number;
  
  /** How the image should be resized to fit dimensions */
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  
  /** Maintain aspect ratio */
  maintainAspectRatio?: boolean;
  
  /** Background color for letterboxing */
  background?: string;
}

/**
 * Options for image optimization
 */
export interface OptimizeOptions {
  /** Quality level (1-100) */
  quality?: number;
  
  /** Progressive/interlaced output */
  progressive?: boolean;
  
  /** Strip metadata */
  stripMetadata?: boolean;
}

/**
 * Options for format conversion
 */
export interface ConvertOptions {
  /** Target format */
  format: string;
  
  /** Quality for lossy formats */
  quality?: number;
  
  /** Compression level */
  compression?: number;
}
