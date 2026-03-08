# Copilot Instructions — Progressive Context for mcp-image-reader

## Source of Truth

Start from `./AGENTS.md` and only expand into files under `./.ai-agents/` as needed.

## Critical Path Rule

In MCP tool calls and examples, always use relative paths starting with `./`.

- ✅ `identify_context({ file_path: "./src/server/index.ts" })`
- ✅ `identify_context({ file_path: "./src/tools/read-image.tool.ts" })`

## Mandatory MCP Flow

1. `identify_context({ file_path: "./src/file.ts" })`
2. `get_current_focus()`
3. `start_session(...)` or `get_merged_guidelines({ context })`
4. Execute requested work
5. `create_checkpoint({ summary, next_focus })`
6. `complete_session()` on completion
7. `refresh_session_context()` every ~10 turns in long sessions

## mcp-image-reader Execution Rules

- Keep changes scoped to requested area (`./src/tools`, `./src/server`, `./src/readers`, etc.)
- Preserve MCP contract shape and strict schema validation
- Validate interface/contract changes before finalizing:
  - `get_contracts()`
  - `validate_contract({ ... })`
- For docs or ADR work, run:
  - `check_existing_documentation({ ... })`
  - `manage_documentation({ ... })`
  - `add_decision({ ... })` when architecture decisions are made

## Commands That Should Work Here

- `npm run compile`
- `npm run lint`
- `npm run test`
- `npm run test:coverage`

## Progressive Disclosure Order

1. `./AGENTS.md`
2. `./.ai-agents/QUICK-REFERENCE.md`
3. `./.ai-agents/skills/SKILL.md`
4. One targeted reference file in `./.ai-agents/skills/` for the current task

## Anti-Patterns

- Loading all references for small tasks
- Generic instructions that ignore this repo’s extension + MCP architecture
- Absolute-path examples
- Skipping checkpoints in multi-step tasks
