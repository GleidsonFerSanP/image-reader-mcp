import { IMCPTool, MCPToolResponse } from '../types/mcp-tool';
import { ImageReaderFactory } from '../readers';
import { ExifMetadataExtractor } from '../metadata';

interface ExtractMetadataArgs {
  source: string | Buffer;
}

/**
 * MCP Tool: extract_metadata
 * Extracts EXIF, IPTC, and XMP metadata from an image
 */
export const extractMetadataTool: IMCPTool = {
  name: 'extract_metadata',
  description: `Extracts comprehensive metadata from an image including EXIF data (camera settings, GPS location), 
IPTC (journalism info), and XMP (Adobe metadata).

Examples:
- Extract metadata: { "source": "/path/to/photo.jpg" }
- From URL: { "source": "https://example.com/photo.jpg" }

Returns:
- Basic info: format, dimensions, size, color space
- EXIF: camera make/model, date taken, GPS coordinates, camera settings (ISO, aperture, shutter speed)
- IPTC: caption, keywords, copyright
- XMP: title, description, rating`,

  inputSchema: {
    type: 'object',
    properties: {
      source: {
        type: 'string',
        description: 'File path or URL of the image'
      }
    },
    required: ['source']
  },

  handler: async (args: unknown): Promise<MCPToolResponse> => {
    try {
      const { source } = args as ExtractMetadataArgs;

      // Get appropriate reader and read image
      const reader = ImageReaderFactory.getReader(source);
      const imageData = await reader.read(source);

      // Extract metadata
      const extractor = new ExifMetadataExtractor();
      const metadata = await extractor.extract(imageData);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(metadata, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error extracting metadata: ${(error as Error).message}`
          }
        ],
        isError: true
      };
    }
  }
};
