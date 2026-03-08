import { IMCPTool, MCPToolResponse } from '../types/mcp-tool';
import { ImageReaderFactory } from '../readers';
import { SharpImageProcessor } from '../processors';

interface ProcessImageOperation {
  type: 'resize' | 'convert' | 'optimize' | 'toBase64';
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  format?: string;
  quality?: number;
  maintainAspectRatio?: boolean;
}

interface ProcessImageArgs {
  source: string | Buffer;
  operations: ProcessImageOperation[];
}

/**
 * MCP Tool: process_image
 * Processes an image with various operations (resize, convert, optimize)
 */
export const processImageTool: IMCPTool = {
  name: 'process_image',
  description: `Processes an image with one or more operations: resize, convert format, optimize, or convert to base64.

Operations are applied in sequence. Supported operations:
- resize: { "type": "resize", "width": 800, "height": 600, "fit": "contain" }
- convert: { "type": "convert", "format": "jpeg", "quality": 85 }
- optimize: { "type": "optimize", "quality": 85 }
- toBase64: { "type": "toBase64" }

Examples:
- Resize: { "source": "/path/image.png", "operations": [{"type": "resize", "width": 500}] }
- Convert to JPEG: { "source": "/path/image.png", "operations": [{"type": "convert", "format": "jpeg"}] }
- Resize and optimize: { "source": "/path/image.jpg", "operations": [{"type": "resize", "width": 800}, {"type": "optimize"}] }`,

  inputSchema: {
    type: 'object',
    properties: {
      source: {
        type: 'string',
        description: 'File path or URL of the image'
      },
      operations: {
        type: 'array',
        description: 'Array of operations to apply in sequence',
        items: {
          type: 'object',
          description: 'Image processing operation',
          properties: {
            type: {
              type: 'string',
              description: 'Operation type',
              enum: ['resize', 'convert', 'optimize', 'toBase64']
            },
            width: {
              type: 'number',
              description: 'Target width for resize (optional)'
            },
            height: {
              type: 'number',
              description: 'Target height for resize (optional)'
            },
            fit: {
              type: 'string',
              description: 'How to fit the image',
              enum: ['cover', 'contain', 'fill', 'inside', 'outside']
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
          },
          required: ['type']
        }
      }
    },
    required: ['source', 'operations']
  },

  handler: async (args: unknown): Promise<MCPToolResponse> => {
    try {
      const { source, operations } = args as ProcessImageArgs;

      if (!operations || operations.length === 0) {
        throw new Error('At least one operation must be specified');
      }

      // Read image
      const reader = ImageReaderFactory.getReader(source);
      let imageData = await reader.read(source);

      const processor = new SharpImageProcessor();
      let base64Result: string | undefined;

      // Apply operations in sequence
      for (const operation of operations) {
        switch (operation.type) {
        case 'resize':
          imageData = await processor.resize(imageData, {
            width: operation.width,
            height: operation.height,
            fit: operation.fit,
            maintainAspectRatio: operation.maintainAspectRatio
          });
          break;

        case 'convert':
          if (!operation.format) {
            throw new Error('Format is required for convert operation');
          }
          imageData = await processor.convert(imageData, {
            format: operation.format,
            quality: operation.quality
          });
          break;

        case 'optimize':
          imageData = await processor.optimize(imageData, {
            quality: operation.quality
          });
          break;

        case 'toBase64':
          base64Result = await processor.toBase64(imageData);
          break;

        default:
          throw new Error(`Unknown operation type: ${operation.type}`);
        }
      }

      const response: Record<string, unknown> = {
        format: imageData.format,
        width: imageData.width,
        height: imageData.height,
        size: imageData.size,
        operationsApplied: operations.length
      };

      if (base64Result) {
        response.base64 = base64Result;
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error processing image: ${(error as Error).message}`
          }
        ],
        isError: true
      };
    }
  }
};
