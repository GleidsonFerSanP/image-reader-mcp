# Contract Reference Workflow

## When to Use

Use this workflow before changing interfaces, MCP tool schemas, server handler contracts, or error contract behavior.

## Primary Tools

* `get_contracts`
* `validate_contract`
* `register_contract`

## Validation Sequence

### 1) Identify context

```ts
identify_context({ file_path: "./src/types/mcp-tool.ts" });
```

### 2) Load relevant contracts

```ts
get_contracts();
```

Filter mentally to current area:

* Tool contract (`IMCPTool`/response shape)
* Reader/processor interfaces
* Error classes and structured context

### 3) Validate planned implementation

```ts
validate_contract({
  contract_name: "IImageReader",
  code: "candidate implementation"
});
```

Repeat per critical interface.

### 4) Register new contract when introducing a stable interface

```ts
register_contract({
  name: "INewToolContract",
  context: "backend",
  description: "Contract for ...",
  interfaceCode: "interface ...",
  rules: ["rule 1", "rule 2"]
});
```

## mcp-image-reader Contract Hotspots

* `./src/types/` for shared shapes and tool response contracts
* `./src/tools/` for input schema ↔ handler alignment
* `./src/readers/` and `./src/processors/` for interface implementations
* `./src/errors/` for domain error structure consistency
* `./src/server/index.ts` for protocol response shape (`content`,  `isError`)

## Failure Handling

If validation fails:

1. Stop implementation changes.
2. Explain mismatch in plain terms.
3. Apply minimum change to restore compatibility.
4. Re-run `validate_contract`.
