import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
  readImageTool,
  extractMetadataTool,
  processImageTool,
  listSupportedFormatsTool,
  batchProcessImagesTool
} from '../tools';

/**
 * MCP Server for Image Reading and Processing
 * Exposes tools for AI agents to interact with images
 */
export class MCPImageReaderServer {
  private server: Server;
  private tools = [
    readImageTool,
    extractMetadataTool,
    processImageTool,
    listSupportedFormatsTool,
    batchProcessImagesTool
  ];

  constructor() {
    this.server = new Server(
      {
        name: 'mcp-image-reader',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  /**
   * Sets up MCP protocol handlers
   */
  private setupHandlers(): void {
    // Handle tool list requests
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.tools.map(tool => ({
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema
        }))
      };
    });

    // Handle tool call requests
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const toolName = request.params.name;
      const tool = this.tools.find(t => t.name === toolName);

      if (!tool) {
        throw new Error(`Unknown tool: ${toolName}`);
      }

      const result = await tool.handler(request.params.arguments);
      
      // Return in the format expected by MCP SDK
      return {
        content: result.content,
        isError: result.isError
      };
    });
  }

  /**
   * Starts the MCP server with stdio transport
   */
  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('MCP Image Reader Server started');
  }

  /**
   * Stops the MCP server
   */
  async stop(): Promise<void> {
    await this.server.close();
    console.error('MCP Image Reader Server stopped');
  }
}

// Start server if run directly
if (require.main === module) {
  const server = new MCPImageReaderServer();
  server.start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}
