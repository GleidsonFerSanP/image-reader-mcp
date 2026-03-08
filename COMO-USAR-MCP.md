# 🎯 Como Usar o MCP Image Reader

## ⚠️ Entendendo o MCP (Model Context Protocol)

### O que é MCP?

MCP é um **protocolo stdio** (standard input/output) que permite **clientes externos** (como Claude Desktop) se comunicarem com servidores que fornecem tools para AI agents.

### ❌ Conceito Errado

~~"A extensão VS Code roda o servidor MCP internamente"~~

### ✅ Conceito Correto

**A extensão VS Code apenas disponibiliza o servidor MCP para ser executado por clientes externos via stdio.**

## 🏗️ Arquitetura

```
┌─────────────────────┐
│   Claude Desktop    │
│  (Cliente MCP)      │
└──────────┬──────────┘
           │ stdio
           │ (node dist/server/index.js)
           │
┌──────────▼──────────┐
│   MCP Image Server  │
│  (Protocol Handler) │
├─────────────────────┤
│  5 Tools:           │
│  - read_image       │
│  - extract_metadata │
│  - process_image    │
│  - list_formats     │
│  - batch_process    │
└─────────────────────┘
```

## 🚀 Como Funciona

### 1. VS Code Extension (Host)

**Papel**: Facilita o desenvolvimento e mostra configuração

```typescript
// extension.ts - NÃO roda o servidor, apenas informa
outputChannel.appendLine('Server path: dist/server/index.js');
outputChannel.appendLine('Use with Claude Desktop via stdio');
```

### 2. MCP Server (Standalone)

**Papel**: Processa requisições stdio de clientes MCP

```typescript
// server/index.ts - Roda quando Claude/cliente executa
const server = new MCPImageReaderServer();
await server.start(); // StdioServerTransport
```

### 3. Cliente MCP (Claude Desktop)

**Papel**: Executa o servidor via node e se comunica por stdio

```json
{
  "mcpServers": {
    "image-reader": {
      "command": "node",
      "args": ["/path/to/dist/server/index.js"]
    }
  }
}
```

## 📝 Passo a Passo para Usar

### Opção 1: Com Claude Desktop (Recomendado)

#### 1. Encontrar o Caminho do Servidor

```bash
# No VS Code, pressione Cmd+Shift+P
# Digite: "MCP Image Reader: Start Server"
# Veja o Output Channel para o caminho completo
```

Ou manualmente:

```bash
ls -la ~/.vscode/extensions | grep mcp-image-reader
# Exemplo: gleidsonfersanp.mcp-image-reader-0.1.0
```

#### 2. Configurar Claude Desktop

Edite: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "image-reader": {
      "command": "node",
      "args": [
        "/Users/SEU_USUARIO/.vscode/extensions/gleidsonfersanp.mcp-image-reader-0.1.0/dist/server/index.js"
      ]
    }
  }
}
```

**⚠️ Substitua `SEU_USUARIO` pelo seu username real!**

#### 3. Reiniciar Claude Desktop

* Feche completamente o Claude Desktop
* Abra novamente
* As tools devem aparecer automaticamente

#### 4. Testar no Claude

```
📸 "Leia esta imagem: /Users/seu/caminho/foto.jpg"
```

O Claude vai:
1. Executar `node dist/server/index.js`
2. Enviar requisição via stdio: `read_image`
3. Receber resposta com base64 da imagem
4. Processar e responder

### Opção 2: Teste Manual via Terminal

```bash
# 1. Ir para o diretório da extensão
cd ~/.vscode/extensions/gleidsonfersanp.mcp-image-reader-0.1.0

# 2. Executar o servidor
node dist/server/index.js

# 3. Enviar requisição MCP (JSON-RPC)
# O servidor aguarda input via stdin
```

**Exemplo de requisição:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list"
}
```

Pressione `Ctrl+D` para enviar.

### Opção 3: Com Outro Cliente MCP

Qualquer cliente que implemente MCP pode usar:

```javascript
import {
    Client
} from '@modelcontextprotocol/sdk/client/index.js';
import {
    StdioClientTransport
} from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
    command: 'node',
    args: ['/path/to/dist/server/index.js']
});

const client = new Client({
    name: 'my-client',
    version: '1.0.0'
}, {
    capabilities: {}
});

await client.connect(transport);
const tools = await client.listTools();
console.log(tools); // 5 tools
```

## 🔍 Verificando se Está Funcionando

### No Claude Desktop

Após configurar, você deve ver:

```
🔧 Available Tools:
- read_image
- extract_metadata
- process_image
- list_supported_formats
- batch_process_images
```

### No VS Code

```bash
# Pressione Cmd+Shift+P
# Digite: "MCP Image Reader: Show Status"
# Deve mostrar: "MCP Image Reader: Ready for stdio connections"
```

### Logs do Claude

```bash
# Ver logs do Claude Desktop
tail -f ~/Library/Logs/Claude/mcp*.log
```

## 🐛 Troubleshooting

### Tools não aparecem no Claude

**Causa**: Caminho errado ou node não encontrado

**Solução**:

```bash
# Verificar caminho
ls -la ~/.vscode/extensions/gleidsonfersanp.mcp-image-reader-*/dist/server/index.js

# Testar manualmente
node ~/.vscode/extensions/gleidsonfersanp.mcp-image-reader-0.1.0/dist/server/index.js
# Se funcionar, o caminho está correto
```

### Erro "Cannot find module"

**Causa**: node_modules não está no local certo

**Solução**: O VSIX já inclui o código compilado, não precisa de node_modules.

### Erro de permissão

**Solução**:

```bash
chmod +x ~/.vscode/extensions/gleidsonfersanp.mcp-image-reader-*/dist/server/index.js
```

## 📊 Exemplo Completo

### 1. Configuração Claude

```json
{
  "mcpServers": {
    "image-reader": {
      "command": "node",
      "args": [
        "/Users/gleidson/.vscode/extensions/gleidsonfersanp.mcp-image-reader-0.1.0/dist/server/index.js"
      ]
    }
  }
}
```

### 2. Conversa no Claude

**Você:**

```
Leia esta imagem e me diga o que vê:
/Users/gleidson/Downloads/foto.jpg
```

**Claude (internamente):**

```typescript
// 1. Inicia o servidor MCP
spawn('node', ['/path/to/dist/server/index.js'])

// 2. Lista tools disponíveis
{ method: 'tools/list' }

// 3. Chama read_image
{
  method: 'tools/call',
  params: {
    name: 'read_image',
    arguments: {
      source: '/Users/gleidson/Downloads/foto.jpg'
    }
  }
}

// 4. Recebe resposta
{
  content: [{
    type: 'text',
    text: 'Image data: {...}'
  }]
}
```

**Claude (responde):**

```
Analisei a imagem. Vejo uma foto de...
[Dimensões: 1920x1080, Formato: JPEG, Tamanho: 856 KB]
```

## ✅ Checklist de Instalação

* [x] Extensão instalada no VS Code
* [x] Servidor compilado em `dist/server/index.js`
* [x] Caminho correto no `claude_desktop_config.json`
* [x] Claude Desktop reiniciado
* [ ] Tools aparecem no Claude
* [ ] Teste com `read_image` funciona

## 🎯 Resumo

1. **MCP = Protocolo stdio** para comunicação
2. **VS Code Extension** = Host/facilitador, não executa
3. **MCP Server** = Executado por clientes externos via node
4. **Claude Desktop** = Cliente que executa e usa as tools
5. **Configuração** = Apontar Claude para o caminho do servidor

**A extensão está pronta, agora configure o Claude Desktop para usar! 🚀**

---

**Autor:** Gleidson FerSanP  
**Versão:** 0.1.0  
**Licença:** MIT
