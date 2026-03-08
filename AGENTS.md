# AGENTS.md

## Project Overview

`mcp-image-reader` is a VS Code extension that embeds an MCP server for image workflows used by AI agents.

* Extension entry: `./src/extension.ts` → compiled to `./dist/extension.js`
* MCP server entry: `./src/server/index.ts`
* Core domains: readers, processors, metadata extraction, tools, typed errors
* Tool surface (MCP): `read_image`,   `extract_metadata`,   `process_image`,   `list_supported_formats`,   `batch_process_images`

## MCP Quick Start (Project Context Extension)

Use this sequence at the beginning of work, always with **relative paths**:

```ts
identify_context({ file_path: "./src/extension.ts" });
get_current_focus();
start_session({ context: "backend", current_focus: "implement/fix requested task" });
get_merged_guidelines({ context: "backend" });
```

If a session already exists, skip `start_session` and continue from the active focus.

## Standard Session Workflow

1. `identify_context({ file_path: "./src/file.ts" })`
2. `get_current_focus()`
3. `start_session(...)` OR `get_merged_guidelines({ context })`
4. Do the task (code/tests/docs)
5. `create_checkpoint({ summary, next_focus })`
6. `complete_session()` when done
7. `refresh_session_context()` every ~10 turns during long tasks

## Path Rule (Critical)

Use relative paths in all MCP calls and examples:

* ✅ `"./src/server/index.ts"`
* ✅ `"./docs/extension-installation-guide.md"`
* ✅ `"./src/tools/process-image.tool.ts"`

## Development Environment

* Node.js: `>=18`
* Package manager: `npm`
* Build: `npm run compile`
* Watch mode: `npm run watch`
* Lint: `npm run lint`
* Tests: `npm run test`
* Coverage: `npm run test:coverage`

## Project-Specific Conventions

* Language: TypeScript strict mode (`./tsconfig.json`)
* Lint target: `./src/**/*.ts` with ESLint
* Tests: Jest + ts-jest (`./test`,   `*.test.ts|*.spec.ts`)
* Coverage thresholds: branches 65%, functions/lines/statements 80%
* Prefer existing aliases and module boundaries (`@/*`,   `@tools/*`,   `@readers/*`, etc.)

## Architecture Map

* `./src/extension.ts`: VS Code activation + MCP server definition provider registration
* `./src/server/index.ts`: MCP server lifecycle,  `ListTools` and `CallTool` handlers
* `./src/tools/`: MCP tool definitions and handlers
* `./src/readers/`: source-specific readers (file/url/buffer)
* `./src/processors/`: image transformations and optimization
* `./src/metadata/`: EXIF metadata extraction
* `./src/errors/`: domain-specific error hierarchy
* `./src/types/`: shared interfaces and schemas

## Contracts, Patterns, Features (Project Context MCP)

Before touching interfaces or behavior contracts:

* `get_contracts()`
* `validate_contract({ ... })` before finalizing

When introducing repeatable implementation patterns:

* `learn_pattern({ ... })`

When adding/updating product behavior:

* `register_feature({ ... })`
* `get_feature_context({ ... })` for full context

## Documentation & ADR Workflow

Before creating docs:

1. `check_existing_documentation({ title, topics, keywords })`
2. If unique, `manage_documentation({ action: "create" | "update", ... })`
3. For architecture choices, `add_decision({ ... })`

## Progressive Context Files

Use these files as layered context (small → detailed):

* `./.ai-agents/QUICK-REFERENCE.md`
* `./.ai-agents/skills/SKILL.md`
* `./.ai-agents/skills/SESSION-WORKFLOW.md`
* `./.ai-agents/skills/CONTRACT-REFERENCE.md`
* `./.ai-agents/skills/DOCUMENTATION-WORKFLOW.md`
* `./.ai-agents/skills/PATTERNS-REFERENCE.md`
* `./.ai-agents/copilot-instructions.md`

## Anti-Patterns to Avoid

* Loading full repo content upfront when task is local
* Skipping `identify_context` and session focus checks
* Using absolute file paths in MCP calls
* Creating duplicate docs without `check_existing_documentation`
* Editing contracts/interfaces without validation
