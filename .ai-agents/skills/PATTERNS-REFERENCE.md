# Patterns Reference — mcp-image-reader

## Architecture Snapshot

* Extension host lifecycle: `./src/extension.ts`
* MCP server orchestration: `./src/server/index.ts`
* Tool layer: `./src/tools/*`
* Reader strategy/factory: `./src/readers/*`
* Processing pipeline: `./src/processors/*`
* Metadata extraction: `./src/metadata/*`
* Domain errors: `./src/errors/*`

## Pattern 1: MCP Tool Definition

Use consistent structure per tool:

1. stable snake_case name
2. concise description with input intent
3. strict `inputSchema`
4. guarded async handler
5. structured success/error response (`content`, optional `isError`)

Applies to: `read_image` , `extract_metadata` , `process_image` , `list_supported_formats` , `batch_process_images` .

## Pattern 2: Reader Selection by Source Type

Reader selection should stay centralized (file, URL, buffer) and avoid duplicating source detection logic across tools.

Expected location: `./src/readers/` factory + concrete readers.

## Pattern 3: Error Taxonomy

Use domain-specific errors in `./src/errors/` with actionable messages and context payloads.

Do not leak raw internal stack traces to user-facing tool output.

## Pattern 4: Server Handler Contract

`./src/server/index.ts` should:

* list tools from the same registry used for dispatch
* reject unknown tool names deterministically
* preserve MCP response shape consistency

## Pattern 5: Test-First Safety for Behavior Changes

For tool/contract changes, align tests in `./test/unit` and integration scenarios in `./test/integration` .

Run:

* `npm run lint`
* `npm run test`
* `npm run test:coverage` when touching shared contracts

## Learn/Update Pattern in MCP

When a new repeatable approach is accepted:

```ts
learn_pattern({
  name: "Pattern Name",
  context: "backend",
  description: "When and why to use it",
  pattern: "Implementation skeleton",
  examples: ["short example"]
});
```
