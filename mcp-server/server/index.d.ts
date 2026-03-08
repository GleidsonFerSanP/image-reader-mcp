/**
 * MCP Server for Image Reading and Processing
 * Exposes tools for AI agents to interact with images
 */
export declare class MCPImageReaderServer {
    private server;
    private tools;
    constructor();
    /**
     * Sets up MCP protocol handlers
     */
    private setupHandlers;
    /**
     * Starts the MCP server with stdio transport
     */
    start(): Promise<void>;
    /**
     * Stops the MCP server
     */
    stop(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map