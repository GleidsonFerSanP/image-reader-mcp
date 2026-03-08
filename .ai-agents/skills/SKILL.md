---
name: mcp-image-reader-context
description: Progressive context hub for mcp-image-reader. Use when editing MCP tools, VS Code extension lifecycle, image readers/processors, contracts, project documentation, or architecture decisions.
---

# mcp-image-reader Context Skill

## Quick Start

```ts
identify_context({ file_path: "./src/server/index.ts" });
get_current_focus();
get_merged_guidelines({ context: "backend" });
start_session({
  context: "backend",
  current_focus: "implement requested change",
});
```

Use `create_checkpoint({ summary, next_focus })` at milestones and `complete_session()` when done.

## Path Convention (Critical)

All file paths in MCP calls must be relative, starting with `./`.

- ✅ `"./src/readers/file-image-reader.ts"`
- ✅ `"./docs/extension-installation-guide.md"`
- ❌ absolute local machine paths

## Project Operating Context

- TypeScript strict project (`./src` → `./dist`)
- VS Code extension activates on startup and registers MCP server provider
- MCP server exposes 5 image tools with schema-driven inputs
- Tests use Jest + ts-jest with coverage thresholds

## Progressive Disclosure Map

Read only what is needed for the current task:

1. Session flow → `./.ai-agents/skills/SESSION-WORKFLOW.md`
2. Contracts/validation → `./.ai-agents/skills/CONTRACT-REFERENCE.md`
3. Docs/ADR workflow → `./.ai-agents/skills/DOCUMENTATION-WORKFLOW.md`
4. Code patterns & module map → `./.ai-agents/skills/PATTERNS-REFERENCE.md`

## Tooling Focus

- Session tools: `identify_context`, `start_session`, `get_current_focus`, `update_focus`, `create_checkpoint`, `refresh_session_context`, `complete_session`
- Guidelines/contracts: `get_merged_guidelines`, `get_guidelines`, `register_contract`, `get_contracts`, `validate_contract`
- Patterns/features: `learn_pattern`, `register_feature`, `get_features`, `get_feature_context`
- Docs/decisions: `check_existing_documentation`, `manage_documentation`, `add_decision`, `get_complete_project_context`

## Anti-Patterns

- Dumping full repository context before narrowing scope
- Writing long, generic instructions instead of task-specific guidance
- Skipping contract validation before interface updates
- Creating docs before checking existing documentation
- Deep reference chains (prefer one-level links from this file)
