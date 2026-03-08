"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPImageReaderServer = void 0;
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const tools_1 = require("../tools");
/**
 * MCP Server for Image Reading and Processing
 * Exposes tools for AI agents to interact with images
 */
class MCPImageReaderServer {
    server;
    tools = [
        tools_1.readImageTool,
        tools_1.extractMetadataTool,
        tools_1.processImageTool,
        tools_1.listSupportedFormatsTool,
        tools_1.batchProcessImagesTool
    ];
    constructor() {
        this.server = new index_js_1.Server({
            name: 'mcp-image-reader',
            version: '0.1.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupHandlers();
    }
    /**
     * Sets up MCP protocol handlers
     */
    setupHandlers() {
        // Handle tool list requests
        this.server.setRequestHandler(types_js_1.ListToolsRequestSchema, async () => {
            return {
                tools: this.tools.map(tool => ({
                    name: tool.name,
                    description: tool.description,
                    inputSchema: tool.inputSchema
                }))
            };
        });
        // Handle tool call requests
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
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
    async start() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error('MCP Image Reader Server started');
    }
    /**
     * Stops the MCP server
     */
    async stop() {
        await this.server.close();
        console.error('MCP Image Reader Server stopped');
    }
}
exports.MCPImageReaderServer = MCPImageReaderServer;
// Start server if run directly
if (require.main === module) {
    const server = new MCPImageReaderServer();
    server.start().catch((error) => {
        console.error('Failed to start server:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map