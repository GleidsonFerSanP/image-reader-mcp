/**
 * JSON Schema property definition
 */
export interface JSONSchemaProperty {
  type: string;
  description: string;
  enum?: string[];
  items?: JSONSchemaProperty;
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
  default?: unknown;
  minimum?: number;
  maximum?: number;
}

/**
 * JSON Schema for MCP tool input validation
 */
export interface JSONSchema {
  type: 'object';
  properties: Record<string, JSONSchemaProperty>;
  required?: string[];
}

/**
 * MCP tool response content item
 */
export interface MCPToolResponseContent {
  /** Content type */
  type: 'text' | 'image' | 'resource';
  
  /** Text content (for type: text) */
  text?: string;
  
  /** Data content (for type: image, base64 encoded) */
  data?: string;
  
  /** MIME type (for type: image or resource) */
  mimeType?: string;
  
  /** Resource URI (for type: resource) */
  uri?: string;
}

/**
 * MCP tool response
 */
export interface MCPToolResponse {
  /** Response content array */
  content: MCPToolResponseContent[];
  
  /** Indicates if response is an error */
  isError?: boolean;
}

/**
 * MCP Tool definition
 * Tools are functions exposed by the MCP server that can be called by AI agents
 */
export interface IMCPTool {
  /**
   * Unique tool name (snake_case)
   */
  name: string;
  
  /**
   * Detailed description of what the tool does
   * Should include usage examples
   */
  description: string;
  
  /**
   * JSON Schema for input parameter validation
   */
  inputSchema: JSONSchema;
  
  /**
   * Handler function that executes the tool logic
   * @param args - Tool arguments (validated against inputSchema)
   * @returns Promise resolving to MCPToolResponse
   */
  handler: (args: unknown) => Promise<MCPToolResponse>;
}

/**
 * MCP Server configuration
 */
export interface MCPServerConfig {
  /** Server name */
  name: string;
  
  /** Server version */
  version: string;
  
  /** List of tools to register */
  tools: IMCPTool[];
}
