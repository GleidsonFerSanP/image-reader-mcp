"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMetadataTool = void 0;
const readers_1 = require("../readers");
const metadata_1 = require("../metadata");
/**
 * MCP Tool: extract_metadata
 * Extracts EXIF, IPTC, and XMP metadata from an image
 */
exports.extractMetadataTool = {
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
    handler: async (args) => {
        try {
            const { source } = args;
            // Get appropriate reader and read image
            const reader = readers_1.ImageReaderFactory.getReader(source);
            const imageData = await reader.read(source);
            // Extract metadata
            const extractor = new metadata_1.ExifMetadataExtractor();
            const metadata = await extractor.extract(imageData);
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(metadata, null, 2)
                    }
                ]
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error extracting metadata: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }
};
//# sourceMappingURL=extract-metadata.tool.js.map