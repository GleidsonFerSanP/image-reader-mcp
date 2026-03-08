# MCP Image Reader

<p align="center">
  <img src="https://img.shields.io/badge/VS%20Code-Extension-blue?logo=visual-studio-code" alt="VS Code Extension">
  <img src="https://img.shields.io/badge/MCP-Protocol-green" alt="MCP Protocol">
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</p>

**MCP Image Reader** é uma extensão VS Code que implementa um servidor MCP (Model Context Protocol) para fornecer capacidades avançadas de leitura e processamento de imagens para agentes de AI.

## 🚀 Funcionalidades

### 5 MCP Tools para AI Agents

* **`read_image`** - Lê imagens de arquivos, URLs ou buffers com suporte a base64
* **`extract_metadata`** - Extrai metadados EXIF, GPS e dados de câmera
* **`process_image`** - Aplica operações de redimensionamento, conversão e otimização
* **`list_supported_formats`** - Lista todos os formatos suportados e suas capacidades
* **`batch_process_images`** - Processa até 10 imagens em batch mode

### Suporte Completo de Formatos

✅ **PNG** - Read/Write, Alpha channel  
✅ **JPEG/JPG** - Read/Write, Otimização mozjpeg  
✅ **WebP** - Read/Write, Alpha + Animation  
✅ **AVIF** - Read/Write, Alta compressão  
✅ **TIFF** - Read/Write, Multi-página  
✅ **GIF** - Read only, Animation  
✅ **SVG** - Read only, Vetorial  
✅ **BMP** - Read/Write, Bitmap

### Processamento Avançado

* **Redimensionamento** com 5 modos de fit (cover, contain, fill, inside, outside)
* **Conversão** entre formatos com otimização automática
* **Extração de Metadados** EXIF/GPS/Camera completo
* **Base64** encoding para integração universal

## 📦 Instalação

### Via VS Code Marketplace

1. Abra VS Code
2. Vá para Extensions (Ctrl+Shift+X)
3. Procure por "MCP Image Reader"
4. Clique em "Install"

### Via Command Line

```bash
code --install-extension gleidsonfersanp.mcp-image-reader
```

## 🔧 Como Usar

### 1. Iniciar o Servidor MCP

Pressione `Cmd+Shift+P` (macOS) ou `Ctrl+Shift+P` (Windows/Linux) e digite:

* `MCP Image Reader: Start Server` - Inicia o servidor
* `MCP Image Reader: Stop Server` - Para o servidor
* `MCP Image Reader: Restart Server` - Reinicia o servidor
* `MCP Image Reader: Show Status` - Mostra o status atual

### 2. Configurar no Cliente MCP

#### Para Claude Desktop

Adicione no arquivo de configuração ( `~/Library/Application Support/Claude/claude_desktop_config.json` ):

```json
{
  "mcpServers": {
    "image-reader": {
      "command": "node",
      "args": ["/caminho/completo/para/dist/server/index.js"]
    }
  }
}
```

#### Para Outros Clientes MCP

Configure o comando MCP para apontar para o servidor compilado em `dist/server/index.js` .

### 3. Usar com AI Agents

Os AI agents terão acesso às seguintes ferramentas:

#### Exemplo: Ler uma Imagem

```typescript
{
  "tool": "read_image",
  "arguments": {
    "source": "/path/to/image.jpg",
    "includeBase64": true
  }
}
```

#### Exemplo: Extrair Metadados

```typescript
{
  "tool": "extract_metadata",
  "arguments": {
    "source": "https://example.com/photo.jpg"
  }
}
```

#### Exemplo: Processar Imagem

```typescript
{
  "tool": "process_image",
  "arguments": {
    "source": "/path/to/image.png",
    "operations": [
      {
        "type": "resize",
        "width": 800,
        "height": 600,
        "fit": "cover"
      },
      {
        "type": "convert",
        "format": "webp"
      },
      {
        "type": "optimize",
        "quality": 85
      }
    ]
  }
}
```

## ⚙️ Configurações

Configure a extensão em `Settings > Extensions > MCP Image Reader` :

| Configuração | Padrão | Descrição |
|--------------|--------|-----------|
| `maxFileSize` | 50MB | Tamanho máximo de arquivo |
| `supportedFormats` | png, jpeg, gif, webp, svg, bmp, tiff | Formatos suportados |
| `batchLimit` | 10 | Limite de imagens em batch |
| `autoOptimize` | true | Otimização automática |
| `defaultQuality` | 85 | Qualidade padrão (1-100) |
| `autoStart` | true | Iniciar automaticamente |

## 🏗️ Arquitetura

```
MCP Image Reader
├── Clean Architecture
├── SOLID Principles
├── Factory Pattern (Readers)
├── Strategy Pattern (Processors)
└── TypeScript Strict Mode
```

**Stack Tecnológico:**
* **MCP SDK** 0.5.0 - Protocol implementation
* **Sharp** 0.33.0 - Image processing (libvips, 4-8x mais rápido)
* **exif-reader** 2.0.0 - Metadata extraction
* **TypeScript** 5.3.0 - Type safety

## 📊 Performance

* **4-8x mais rápido** que Jimp/node-canvas (graças ao libvips)
* **Baixo uso de memória** com streaming
* **Processamento nativo** sem dependências Python
* **82.75% test coverage** para qualidade garantida

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🐛 Reportar Bugs

Encontrou um bug? [Abra uma issue](https://github.com/GleidsonFerSanP/mcp-image-reader/issues)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

* [Sharp](https://sharp.pixelplumbing.com/) - Processamento de imagem de alta performance
* [MCP SDK](https://modelcontextprotocol.io/) - Model Context Protocol
* [exif-reader](https://github.com/devongovett/exif-reader) - Extração de metadados EXIF

---

**Made with ❤️ by Gleidson FerSanP**

[GitHub](https://github.com/GleidsonFerSanP/mcp-image-reader) • [Report Bug](https://github.com/GleidsonFerSanP/mcp-image-reader/issues) • [Request Feature](https://github.com/GleidsonFerSanP/mcp-image-reader/issues)
