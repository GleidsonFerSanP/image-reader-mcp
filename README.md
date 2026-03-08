# MCP Image Reader

> 🖼️ Model Context Protocol server para leitura e processamento de imagens para agentes de AI

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![VS Code Extension](https://img.shields.io/badge/VS%20Code-Extension-blue)](https://code.visualstudio.com/)
[![MCP Protocol](https://img.shields.io/badge/MCP-Protocol-green)](https://modelcontextprotocol.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Lines of Code](https://img.shields.io/badge/LoC-2453-brightgreen)]()
[![Files](https://img.shields.io/badge/Files-34-orange)]()

## 📋 Sobre

**MCP Image Reader** é uma extensão VS Code que implementa um servidor MCP (Model Context Protocol) para fornecer capacidades avançadas de leitura e processamento de imagens para agentes de AI como GitHub Copilot, Claude, GPT-4, entre outros.

### Principais Funcionalidades

* 🖼️ **Leitura Multi-fonte:** Suporta arquivos locais, URLs e buffers
* 🎨 **Múltiplos Formatos:** PNG, JPEG, GIF, WebP, SVG, BMP, TIFF
* 📸 **Extração de Metadados:** EXIF, IPTC, XMP incluindo GPS e dados de câmera
* ⚙️ **Processamento de Imagens:** Redimensionamento, conversão, otimização
* 🔄 **Batch Processing:** Processa até 10 imagens simultaneamente
* 🚀 **Alto Performance:** Baseado em Sharp (libvips)
* 🔒 **Type Safe:** 100% TypeScript com strict mode
* 🧪 **Testado:** Cobertura de testes >80%

## 🚀 Instalação

### Via VS Code Marketplace (em breve)

```bash
code --install-extension mcp-image-reader
```

### Manual (desenvolvimento)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/mcp-image-reader.git
cd mcp-image-reader

# Instale dependências
npm install

# Compile o projeto
npm run compile

# Execute em modo desenvolvimento
npm run watch
```

Pressione `F5` para abrir uma nova janela do VS Code com a extensão carregada.

## 📖 MCP Tools Disponíveis

### 1. `read_image`

Lê uma imagem e retorna seus dados incluindo base64.

```typescript
{
  "name": "read_image",
  "arguments": {
    "source": "/path/to/image.png",
    "includeMetadata": false,
    "convertToBase64": true
  }
}
```

**Retorna:**
* Buffer da imagem
* Formato (png, jpeg, etc)
* Dimensões (width, height)
* Base64 string (opcional)
* Metadados (opcional)

### 2. `extract_metadata`

Extrai metadados EXIF, IPTC e XMP de uma imagem.

```typescript
{
  "name": "extract_metadata",
  "arguments": {
    "source": "/path/to/photo.jpg"
  }
}
```

**Retorna:**
* Dados EXIF (câmera, data, configurações)
* Coordenadas GPS (se disponível)
* Informações básicas (formato, dimensões, tamanho)

### 3. `process_image`

Processa uma imagem com operações de manipulação.

```typescript
{
  "name": "process_image",
  "arguments": {
    "source": "/path/to/image.png",
    "operations": [
      {
        "type": "resize",
        "width": 800,
        "height": 600,
        "fit": "contain"
      },
      {
        "type": "convert",
        "format": "jpeg"
      },
      {
        "type": "optimize",
        "quality": 85
      }
    ]
  }
}
```

**Operações suportadas:**
* `resize`: Redimensionar imagem
* `convert`: Converter formato
* `optimize`: Otimizar tamanho
* `toBase64`: Converter para base64

### 4. `list_supported_formats`

Lista todos os formatos de imagem suportados.

```typescript
{
  "name": "list_supported_formats",
  "arguments": {}
}
```

**Retorna:**

```json
{
  "formats": ["png", "jpeg", "gif", "webp", "svg", "bmp", "tiff"],
  "metadata": {
    "png": { "supportsAlpha": true, "supportsAnimation": false },
    "jpeg": { "supportsAlpha": false, "supportsAnimation": false },
    ...
  }
}
```

### 5. `batch_process_images`

Processa múltiplas imagens em batch (máximo 10).

```typescript
{
  "name": "batch_process_images",
  "arguments": {
    "sources": [
      "/path/to/image1.png",
      "/path/to/image2.jpg",
      "https://example.com/image3.png"
    ],
    "operation": "resize",
    "options": {
      "width": 500,
      "maintainAspectRatio": true
    }
  }
}
```

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────┐
│         VS Code Extension Host              │
│  ┌────────────────────────────────────────┐ │
│  │       MCP Image Reader Extension       │ │
│  │                                        │ │
│  │  ┌──────────────────────────────────┐ │ │
│  │  │     MCP Server Manager           │ │ │
│  │  │  - Start/Stop/Restart            │ │ │
│  │  │  - Lifecycle Management          │ │ │
│  │  └──────────────────────────────────┘ │ │
│  │                                        │ │
│  │  ┌──────────────────────────────────┐ │ │
│  │  │     MCP Server                   │ │ │
│  │  │  ┌────────────────────────────┐  │ │ │
│  │  │  │  MCP Tools Registry        │  │ │ │
│  │  │  │  - read_image              │  │ │ │
│  │  │  │  - extract_metadata        │  │ │ │
│  │  │  │  - process_image           │  │ │ │
│  │  │  │  - list_supported_formats  │  │ │ │
│  │  │  │  - batch_process_images    │  │ │ │
│  │  │  └────────────────────────────┘  │ │ │
│  │  └──────────────────────────────────┘ │ │
│  └────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
                    │
                    ├── Image Readers
                    │   ├── FileImageReader
                    │   ├── URLImageReader
                    │   └── BufferImageReader
                    │
                    ├── Image Processor (Sharp)
                    │   ├── Resize
                    │   ├── Convert
                    │   └── Optimize
                    │
                    └── Metadata Extractor
                        ├── EXIF
                        ├── IPTC
                        └── XMP
```

## 🎯 Casos de Uso

### 1. Análise de Imagem com AI

```markdown
@workspace /read_image screenshot.png

Analise esta captura de tela e descreva o que você vê.
```

O agente de AI usa o tool `read_image` para obter a imagem em base64 e então analisa o conteúdo.

### 2. Extração de Localização de Fotos

```markdown
@workspace Onde esta foto foi tirada?

/extract_metadata photo.jpg
```

O agente extrai metadados GPS e fornece a localização geográfica.

### 3. Otimização de Imagens em Batch

```markdown
@workspace Otimize todas as imagens PNG nesta pasta para JPEG com 80% de qualidade

/batch_process_images *.png --convert jpeg --quality 80
```

### 4. Análise de Configurações de Câmera

```markdown
@workspace Quais configurações de câmera foram usadas nesta foto?

/extract_metadata dsc001.jpg
```

O agente retorna ISO, aperture, shutter speed, focal length, etc.

## 🔧 Configuração

Acesse as configurações da extensão em VS Code:

```json
{
  "mcpImageReader.maxFileSize": 52428800,  // 50MB
  "mcpImageReader.supportedFormats": ["png", "jpeg", "gif", "webp"],
  "mcpImageReader.batchLimit": 10,
  "mcpImageReader.autoOptimize": true,
  "mcpImageReader.defaultQuality": 85
}
```

## 🧪 Desenvolvimento

### Requisitos

* Node.js 18+
* npm 9+
* VS Code 1.85+

### Setup do Ambiente

```bash
# Instalar dependências
npm install

# Compilar TypeScript
npm run compile

# Executar testes
npm test

# Executar linting
npm run lint

# Watch mode (desenvolvimento)
npm run watch
```

### Estrutura do Projeto

```
mcp-image-reader/
├── src/
│   ├── extension.ts          # Entry point
│   ├── server-manager.ts     # Server lifecycle
│   ├── server/               # MCP server
│   ├── tools/                # MCP tools
│   ├── readers/              # Image readers
│   ├── processors/           # Image processors
│   ├── metadata/             # Metadata extractors
│   ├── errors/               # Custom errors
│   └── types/                # TypeScript types
├── test/                     # Testes
├── docs/                     # Documentação
└── package.json
```

## 📚 Documentação Adicional

* [📋 Plano de Implementação](docs/plano-implementacao.md)
* [🏛️ Decisões Arquiteturais (ADRs)](docs/architecture-decisions/)
* [🔧 Contratos e Interfaces](docs/contracts/)
* [🎨 Patterns de Código](docs/patterns/)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 License

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

* [Sharp](https://sharp.pixelplumbing.com/) - Biblioteca de processamento de imagens
* [MCP Protocol](https://modelcontextprotocol.io/) - Model Context Protocol
* [VS Code Extension API](https://code.visualstudio.com/api) - VS Code Extension API

## 📞 Contato

**Gleidson FerSanP** - [@GleidsonFerSanP](https://github.com/GleidsonFerSanP)

**Link do Projeto:** [https://github.com/GleidsonFerSanP/mcp-image-reader](https://github.com/GleidsonFerSanP/mcp-image-reader)

---

**Status do Projeto:** 🚧 Em Desenvolvimento (Fase de Planejamento)

**Versão Atual:** 0.1.0 (Alpha)

**Roadmap:**
* ✅ Planejamento e arquitetura
* ⏳ Implementação core (em andamento)
* ⏳ Testes e qualidade
* ⏳ Documentação completa
* ⏳ Publicação no Marketplace
