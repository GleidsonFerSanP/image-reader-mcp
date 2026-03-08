# Session Workflow — mcp-image-reader

## Objective

Keep work scoped, checkpointed, and resilient to context drift while editing extension + MCP server code.

## Standard Flow

### 1) Identify context

```ts
identify_context({ file_path: "./src/extension.ts" });
```

Use the file closest to the requested task (tool file, server file, tests, or docs).

### 2) Load current focus

```ts
get_current_focus();
```

* If no active session: start one.
* If active session matches task: continue.
* If user changed direction: update focus.

### 3) Start or align session

```ts
start_session({ context: "backend", current_focus: "implement X in ./src/tools/..." });
```

or

```ts
update_focus({ new_focus: "new objective", reason: "user changed scope" });
```

### 4) Load rules

```ts
get_merged_guidelines({ context: "backend" });
```

Use `get_guidelines({ context })` when context-specific standards are enough.

### 5) Execute + checkpoint

After meaningful progress (feature slice, bug fix, refactor step):

```ts
create_checkpoint({
  summary: "Implemented tool input validation and updated tests",
  next_focus: "finish error handling + docs"
});
```

### 6) Refresh long sessions

```ts
refresh_session_context();
```

Run every ~10 turns or after long exploration.

### 7) Complete session

```ts
complete_session();
```

Complete only when requested outcome is delivered.

## mcp-image-reader Focus Templates

* `"Add new MCP tool in ./src/tools with schema + handler + tests"`
* `"Fix extension activation issue in ./src/extension.ts"`
* `"Improve metadata extraction flow in ./src/metadata"`
* `"Refactor image reader factory in ./src/readers"`

## Compaction Strategy

When task gets large, retain only:

* Current objective
* Key decisions made
* Open issues
* Next concrete step

Drop raw logs and repeated command output from active context.
