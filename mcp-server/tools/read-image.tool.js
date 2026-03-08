"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readImageTool = void 0;
const readers_1 = require("../readers");
const processors_1 = require("../processors");
/**
 * MCP Tool: read_image
 * Reads an image from file path, URL, or Buffer and returns image data
 */
exports.readImageTool = {
    name: 'read_image',
    description: `Reads an image from a file path, URL, or Buffer and returns image data including dimensions, format, and optionally base64 encoding.

Examples:
- Read local file: { "source": "/path/to/image.png" }
- Read from URL: { "source": "https://example.com/image.jpg" }
- Include metadata: { "source": "/path/to/image.jpg", "includeMetadata": true }
- Get base64: { "source": "/path/to/image.png", "convertToBase64": true }`,
    inputSchema: {
        type: 'object',
        properties: {
            source: {
                type: 'string',
                description: 'File path or URL of the image to read'
            },
            includeMetadata: {
                type: 'boolean',
                description: 'Whether to include EXIF metadata in the response',
                default: false
            },
            convertToBase64: {
                type: 'boolean',
                description: 'Whether to convert the image to base64 encoding',
                default: true
            }
        },
        required: ['source']
    },
    handler: async (args) => {
        try {
            const { source, convertToBase64 = true } = args;
            // Get appropriate reader
            const reader = readers_1.ImageReaderFactory.getReader(source);
            // Read image
            const imageData = await reader.read(source);
            // Convert to base64 if requested
            let base64Data;
            if (convertToBase64) {
                const processor = new processors_1.SharpImageProcessor();
                base64Data = await processor.toBase64(imageData);
            }
            // Build response
            const response = {
                format: imageData.format,
                width: imageData.width,
                height: imageData.height,
                size: imageData.size,
                colorSpace: imageData.colorSpace,
                hasAlpha: imageData.hasAlpha
            };
            if (base64Data) {
                response.base64 = base64Data;
            }
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(response, null, 2)
                    }
                ]
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error reading image: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }
};
//# sourceMappingURL=read-image.tool.js.map