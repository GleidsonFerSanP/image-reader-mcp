"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSupportedFormatsTool = void 0;
const format_detector_1 = require("../utils/format-detector");
/**
 * MCP Tool: list_supported_formats
 * Lists all supported image formats with their capabilities
 */
exports.listSupportedFormatsTool = {
    name: 'list_supported_formats',
    description: `Lists all supported image formats and their capabilities.

Returns information about:
- Format name and common extensions
- Alpha channel support
- Animation support
- Recommended use cases`,
    inputSchema: {
        type: 'object',
        properties: {},
        required: []
    },
    handler: async () => {
        try {
            const formatInfo = {
                formats: [...format_detector_1.SUPPORTED_FORMATS],
                details: {
                    png: {
                        extensions: ['png'],
                        supportsAlpha: true,
                        supportsAnimation: false,
                        lossless: true,
                        useCase: 'Graphics, logos, screenshots with transparency'
                    },
                    jpeg: {
                        extensions: ['jpg', 'jpeg'],
                        supportsAlpha: false,
                        supportsAnimation: false,
                        lossless: false,
                        useCase: 'Photos, images without transparency'
                    },
                    gif: {
                        extensions: ['gif'],
                        supportsAlpha: true,
                        supportsAnimation: true,
                        lossless: true,
                        useCase: 'Simple animations, limited color palette'
                    },
                    webp: {
                        extensions: ['webp'],
                        supportsAlpha: true,
                        supportsAnimation: true,
                        lossless: false,
                        useCase: 'Modern web images, better compression than JPEG/PNG'
                    },
                    svg: {
                        extensions: ['svg'],
                        supportsAlpha: true,
                        supportsAnimation: true,
                        lossless: true,
                        useCase: 'Vector graphics, scalable icons and illustrations'
                    },
                    bmp: {
                        extensions: ['bmp'],
                        supportsAlpha: true,
                        supportsAnimation: false,
                        lossless: true,
                        useCase: 'Windows bitmap, large file sizes'
                    },
                    tiff: {
                        extensions: ['tiff', 'tif'],
                        supportsAlpha: true,
                        supportsAnimation: false,
                        lossless: true,
                        useCase: 'Professional photography, archival'
                    },
                    avif: {
                        extensions: ['avif'],
                        supportsAlpha: true,
                        supportsAnimation: true,
                        lossless: false,
                        useCase: 'Next-gen format, excellent compression'
                    }
                },
                totalFormats: format_detector_1.SUPPORTED_FORMATS.length
            };
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(formatInfo, null, 2)
                    }
                ]
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error listing formats: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }
};
//# sourceMappingURL=list-formats.tool.js.map