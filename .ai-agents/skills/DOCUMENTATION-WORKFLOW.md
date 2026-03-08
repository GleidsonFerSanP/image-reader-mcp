# Documentation Workflow

## Goal

Create or update docs without duplication, while preserving architecture decisions and feature context.

## Primary Tools

* `check_existing_documentation`
* `manage_documentation`
* `add_decision`
* `register_feature`
* `get_complete_project_context`

## Pre-Create Check (Mandatory)

```ts
identify_context({ file_path: "./docs/extension-installation-guide.md" });
check_existing_documentation({
  title: "MCP tool contract update guide",
  topics: ["mcp", "contracts", "tools"],
  keywords: ["validate_contract", "tool schema", "server handler"]
});
```

If duplicate/similar docs exist, update instead of creating a new file.

## Create or Update

```ts
manage_documentation({
  action: "create",
  title: "MCP Tool Evolution Guide",
  file_path: "./docs/mcp-tool-evolution-guide.md",
  context: "backend",
  type: "guide",
  summary: "How to evolve tools without breaking contracts",
  topics: ["mcp", "tools", "contracts"],
  keywords: ["read_image", "process_image", "validate_contract"]
});
```

## Architecture Decisions (ADR style)

When choosing between approaches, record rationale:

```ts
add_decision({
  title: "Keep MCP tools schema-first",
  context: "Avoid runtime ambiguity across agents",
  decision: "Input schemas remain strict JSON Schema objects",
  alternatives: ["loose runtime validation", "inferred schemas"],
  positiveConsequences: ["predictable contracts", "better tool UX"],
  negativeConsequences: ["more upfront schema maintenance"]
});
```

## Feature Registration

For shipped behavior changes:

```ts
register_feature({
  name: "Batch processing safeguards",
  context: "backend",
  description: "Limits and validates multi-image operations",
  businessRules: ["max batch size respected", "clear per-item errors"]
});
```

## Documentation Style for This Repo

* Keep examples executable for `npm` scripts used here
* Use relative paths in all file references (`./src/...`,  `./docs/...`)
* Prefer short, task-oriented docs over long narrative docs
