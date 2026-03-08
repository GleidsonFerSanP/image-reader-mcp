# QUICK REFERENCE — mcp-image-reader

## 60-Second Start

```ts
identify_context({ file_path: "./src/extension.ts" });
get_current_focus();
get_merged_guidelines({ context: "backend" });
start_session({ context: "backend", current_focus: "task objective" });
```

If focus already exists, continue and skip new session creation.

## Mandatory Workflow (Every Conversation)

1. `identify_context({ file_path: "./src/file.ts" })`
2. `get_current_focus()`
3. `start_session(...)` or `get_merged_guidelines({ context })`
4. Implement change
5. `create_checkpoint({ summary, next_focus })`
6. `complete_session()` when complete
7. `refresh_session_context()` every ~10 turns

## Path Rule (Never Break)

* Use only relative paths beginning with `./`
* Good: `"./src/tools/read-image.tool.ts"`
* Good: `"./docs/plano-implementacao.md"`

## Repo-Specific Commands

* Install: `npm install`
* Build: `npm run compile`
* Watch: `npm run watch`
* Lint: `npm run lint`
* Tests: `npm run test`
* Coverage: `npm run test:coverage`

## High-Risk Checks

Before interface changes:

* `get_contracts()`
* `validate_contract({ ... })`

Before new docs:

* `check_existing_documentation({ ... })`
* `manage_documentation({ action: "create" | "update", ... })`

When architecture changes:

* `add_decision({ ... })`

## Where To Go Next

* Workflow detail: `./.ai-agents/skills/SESSION-WORKFLOW.md`
* Contracts: `./.ai-agents/skills/CONTRACT-REFERENCE.md`
* Documentation: `./.ai-agents/skills/DOCUMENTATION-WORKFLOW.md`
* Patterns: `./.ai-agents/skills/PATTERNS-REFERENCE.md`
* Hub: `./.ai-agents/skills/SKILL.md`
* Main project entry: `./AGENTS.md`
