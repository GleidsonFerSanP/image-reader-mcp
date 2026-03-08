import * as vscode from 'vscode';
import * as path from 'path';

let outputChannel: vscode.OutputChannel;

/**
 * Extension activation
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
  console.log('MCP Image Reader extension is now active');
  
  // Create output channel for logs
  outputChannel = vscode.window.createOutputChannel('MCP Image Reader');
  context.subscriptions.push(outputChannel);

  // Register MCP Server Definition Provider for GitHub Copilot
  context.subscriptions.push(
    vscode.lm.registerMcpServerDefinitionProvider('image-reader', {
      provideMcpServerDefinitions() {
        const mcpServerPath = path.join(context.extensionPath, 'mcp-server', 'server', 'index.js');
        return [
          new vscode.McpStdioServerDefinition('image-reader', 'node', [mcpServerPath])
        ];
      }
    })
  );

  outputChannel.appendLine('MCP Image Reader server registered with GitHub Copilot');
  outputChannel.appendLine(`Server path: ${path.join(context.extensionPath, 'mcp-server', 'server', 'index.js')}`);

  // Create status bar item
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBarItem.text = '$(check) MCP Image Reader';
  statusBarItem.tooltip = 'MCP Image Reader is ready (click for info)';
  statusBarItem.command = 'mcp-image-reader.showInfo';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('mcp-image-reader.showInfo', () => {
      const mcpServerPath = path.join(context.extensionPath, 'mcp-server', 'server', 'index.js');
      vscode.window.showInformationMessage(
        'MCP Image Reader is active and available to GitHub Copilot with 5 tools'
      );
      outputChannel.clear();
      outputChannel.appendLine('=== MCP Image Reader ===');
      outputChannel.appendLine('Status: Active and registered with GitHub Copilot');
      outputChannel.appendLine('');
      outputChannel.appendLine('Available Tools:');
      outputChannel.appendLine('  1. read_image - Read images from file, URL, or buffer');
      outputChannel.appendLine('  2. extract_metadata - Extract EXIF, GPS, and camera metadata');
      outputChannel.appendLine('  3. process_image - Resize, convert, and optimize images');
      outputChannel.appendLine('  4. list_supported_formats - List all supported image formats');
      outputChannel.appendLine('  5. batch_process_images - Process multiple images at once');
      outputChannel.appendLine('');
      outputChannel.appendLine(`Server Path: ${mcpServerPath}`);
      outputChannel.appendLine('');
      outputChannel.appendLine('The tools are automatically available in:');
      outputChannel.appendLine('  - GitHub Copilot Chat');
      outputChannel.appendLine('  - Claude Desktop (if configured)');
      outputChannel.show();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('mcp-image-reader.showClaudeConfig', () => {
      const mcpServerPath = path.join(context.extensionPath, 'mcp-server', 'server', 'index.js');
      outputChannel.clear();
      outputChannel.appendLine('=== Claude Desktop Configuration ===');
      outputChannel.appendLine('');
      outputChannel.appendLine('Add this to: ~/Library/Application Support/Claude/claude_desktop_config.json');
      outputChannel.appendLine('');
      outputChannel.appendLine(JSON.stringify({
        "mcpServers": {
          "image-reader": {
            "command": "node",
            "args": [mcpServerPath]
          }
        }
      }, null, 2));
      outputChannel.show();
      
      vscode.window.showInformationMessage(
        'Claude Desktop configuration shown in Output channel',
        'Open Output'
      ).then(selection => {
        if (selection === 'Open Output') {
          outputChannel.show();
        }
      });
    })
  );

  outputChannel.appendLine('MCP Image Reader activated successfully!');
}

/**
 * Extension deactivation
 */
export async function deactivate(): Promise<void> {
  outputChannel?.appendLine('MCP Image Reader deactivated');
}
