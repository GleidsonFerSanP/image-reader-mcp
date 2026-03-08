"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchProcessImagesTool = void 0;
const readers_1 = require("../readers");
const processors_1 = require("../processors");
/**
 * MCP Tool: batch_process_images
 * Processes multiple images with the same operation
 * Limited to 10 images per batch as per ADR-005
 */
exports.batchProcessImagesTool = {
    name: 'batch_process_images',
    description: `Processes multiple images (up to 10) with the same operation in sequence.

Supported operations:
- resize: Resize all images to specified dimensions
- convert: Convert all images to specified format
- optimize: Optimize all images for smaller file size

Examples:
- Resize batch: { "sources": ["/path/img1.jpg", "/path/img2.jpg"], "operation": "resize", "options": {"width": 500} }
- Convert batch: { "sources": ["img1.png", "img2.png"], "operation": "convert", "options": {"format": "jpeg"} }
- Optimize batch: { "sources": ["photo1.jpg", "photo2.jpg"], "operation": "optimize", "options": {"quality": 85} }

Note: Processing is sequential to manage memory usage. Maximum 10 images per batch.`,
    inputSchema: {
        type: 'object',
        properties: {
            sources: {
                type: 'array',
                description: 'Array of file paths or URLs (max 10)',
                items: {
                    type: 'string',
                    description: 'Image source (file path or URL)'
                },
                maximum: 10
            },
            operation: {
                type: 'string',
                description: 'Operation to apply to all images',
                enum: ['resize', 'convert', 'optimize']
            },
            options: {
                type: 'object',
                description: 'Options for the operation',
                properties: {
                    width: {
                        type: 'number',
                        description: 'Target width for resize'
                    },
                    height: {
                        type: 'number',
                        description: 'Target height for resize'
                    },
                    format: {
                        type: 'string',
                        description: 'Target format for conversion'
                    },
                    quality: {
                        type: 'number',
                        description: 'Quality level (1-100)',
                        minimum: 1,
                        maximum: 100
                    },
                    maintainAspectRatio: {
                        type: 'boolean',
                        description: 'Maintain aspect ratio when resizing'
                    }
                }
            }
        },
        required: ['sources']
    },
    handler: async (args) => {
        try {
            const { sources, operation, options = {} } = args;
            // Validate batch limit (ADR-005)
            if (sources.length > 10) {
                throw new Error('Maximum 10 images allowed per batch');
            }
            if (sources.length === 0) {
                throw new Error('At least one image source must be provided');
            }
            const processor = new processors_1.SharpImageProcessor();
            const results = [];
            // Process each image sequentially
            for (const source of sources) {
                try {
                    // Read image
                    const reader = readers_1.ImageReaderFactory.getReader(source);
                    let imageData = await reader.read(source);
                    // Apply operation if specified
                    if (operation) {
                        switch (operation) {
                            case 'resize':
                                imageData = await processor.resize(imageData, {
                                    width: options.width,
                                    height: options.height,
                                    maintainAspectRatio: options.maintainAspectRatio
                                });
                                break;
                            case 'convert':
                                if (!options.format) {
                                    throw new Error('Format is required for convert operation');
                                }
                                imageData = await processor.convert(imageData, {
                                    format: options.format,
                                    quality: options.quality
                                });
                                break;
                            case 'optimize':
                                imageData = await processor.optimize(imageData, {
                                    quality: options.quality
                                });
                                break;
                        }
                    }
                    results.push({
                        source,
                        success: true,
                        result: {
                            format: imageData.format,
                            width: imageData.width,
                            height: imageData.height,
                            size: imageData.size
                        }
                    });
                }
                catch (error) {
                    results.push({
                        source,
                        success: false,
                        error: error.message
                    });
                }
            }
            const summary = {
                total: sources.length,
                successful: results.filter(r => r.success).length,
                failed: results.filter(r => !r.success).length,
                operation: operation || 'read',
                results
            };
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(summary, null, 2)
                    }
                ]
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error in batch processing: ${error.message}`
                    }
                ],
                isError: true
            };
        }
    }
};
//# sourceMappingURL=batch-process.tool.js.map