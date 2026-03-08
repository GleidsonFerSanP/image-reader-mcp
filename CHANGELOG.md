# Changelog

All notable changes to the MCP Image Reader extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), 
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-09

### Added

* Initial release of MCP Image Reader
* **5 MCP Tools** for AI agents:
  + `read_image` - Read images from files, URLs, or buffers with base64 support
  + `extract_metadata` - Extract EXIF, GPS, and camera metadata
  + `process_image` - Apply resize, convert, and optimize operations
  + `list_supported_formats` - List all supported image formats and capabilities
  + `batch_process_images` - Process up to 10 images in batch mode
* **Multi-source Image Reading**:
  + File system support with path validation
  + URL support with HTTP/HTTPS downloads
  + Buffer support for in-memory processing
  + Factory pattern for dynamic reader selection
* **Image Processing**:
  + Resize with 5 fit modes (cover, contain, fill, inside, outside)
  + Convert between 9 formats (JPEG, PNG, WebP, AVIF, TIFF, GIF, SVG, BMP, HEIF)
  + Optimize with format-specific compression (mozjpeg for JPEG)
  + Base64 encoding for responses
* **Metadata Extraction**:
  + EXIF data (camera make/model, datetime, orientation, software)
  + GPS data (latitude/longitude with DMS to decimal conversion, altitude)
  + Camera data (ISO, exposure time, f-number, focal length, flash, white balance)
* **VS Code Extension**:
  + 4 commands (Start/Stop/Restart/Status)
  + Status bar integration
  + Auto-start configuration
  + Settings for max file size, supported formats, batch limit, quality
* **Error Handling**:
  + 5 custom domain errors (DomainError, ImageReadError, ImageFormatError, ImageProcessingError, MetadataExtractionError)
  + Rich context in error messages
  + JSON serialization for errors
* **Architecture**:
  + Clean Architecture principles
  + SOLID design patterns
  + Factory pattern for readers
  + Strategy pattern for processors/extractors
  + TypeScript strict mode
* **Testing**:
  + Jest test framework
  + 21 unit tests with 82.75% coverage
  + Comprehensive utils testing (format detector, size limiter, validators)
* **Documentation**:
  + Comprehensive README with examples
  + Architecture Decision Records (5 ADRs)
  + Implementation plan (10 phases)
  + Executive summary
  + MIT License

### Technical Details

* **Dependencies**:
  + `@modelcontextprotocol/sdk` v0.5.0 - MCP protocol implementation
  + `sharp` v0.33.0 - High-performance image processing (libvips)
  + `exif-reader` v2.0.0 - EXIF metadata extraction
  + `axios` v1.6.0 - HTTP client for URL downloads
* **TypeScript**: v5.3.0 with strict mode enabled
* **VS Code Engine**: ^1.85.0
* **Node.js**: >=18.0.0

### Architecture Decisions

1. **Sharp over Jimp/node-canvas** - 4-8x performance improvement, native libvips bindings
2. **VS Code Extension with MCP** - Seamless integration, status bar, auto-start
3. **Base64 responses** - Universal compatibility, no temp files
4. **TypeScript strict mode** - Maximum type safety
5. **Sequential batch processing** - Resource management, 10 image limit

### Supported Image Formats

* PNG - Read/Write, Alpha channel, No animation
* JPEG/JPG - Read/Write, No alpha, No animation
* WebP - Read/Write, Alpha channel, Animation support
* AVIF - Read/Write, Alpha channel, No animation
* TIFF/TIF - Read/Write, Alpha channel, No animation
* GIF - Read only, No alpha, Animation support
* SVG - Read only, Alpha channel, No animation
* BMP - Read/Write, No alpha, No animation

### Statistics

* **Files**: 47 total (34 TypeScript source files)
* **Lines of Code**: 2, 453
* **Tests**: 21 unit tests
* **Coverage**: 82.75% statements, 68.62% branches, 80% functions, 82.45% lines

## [Unreleased]

### Planned

* Integration tests for MCP tools
* Additional unit tests for readers, processors, metadata extractors
* Performance benchmarks
* VS Code Marketplace publication
* Docker image support
* CLI tool for standalone use
* Additional image format support (HEIF, WebP2)
* Streaming support for large files
* Caching layer for frequently accessed images

---

**Note**: This project follows [Semantic Versioning](https://semver.org/). Given a version number MAJOR. MINOR. PATCH:
* MAJOR version for incompatible API changes
* MINOR version for new functionality in a backwards compatible manner
* PATCH version for backwards compatible bug fixes
