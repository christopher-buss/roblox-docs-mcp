# Roblox Documentation MCP Server - Development Plan

## 📋 Project Overview

This project is a **simplified Roblox Documentation MCP Server** with integrated RAG (Retrieval-Augmented Generation) support, built on a streamlined TypeScript MCP template. It provides intelligent search and retrieval capabilities for Roblox documentation through semantic search and vector embeddings, with unnecessary template complexity removed.

**Purpose**: Enable AI agents to intelligently search, retrieve, and understand Roblox documentation including API references, tutorials, guides, and code examples through natural language queries.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MCP Client    │◄──►│   MCP Server    │◄──►│  RAG Services   │
│   (AI Agent)    │    │   (This Repo)   │    │  (ChromaDB +    │
│                 │    │                 │    │   OpenAI)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │ Roblox Docs     │
                       │ Pipeline        │
                       │ (Scraper +      │
                       │  Processor)     │
                       └─────────────────┘
```

## 🚀 Implementation Phases

### ✅ Phase 1: Project Setup & Configuration (COMPLETED)

- [x] **Update CLAUDE.md** with Roblox-specific project information
- [x] **Update package.json** metadata for roblox-docs-mcp
- [x] **Configure project identity** and repository information
- [x] **Update development documents** to reflect GitHub-based approach
- [x] **Add required dependencies** (ChromaDB, simple-git, markdown-it, YAML, Redis)

### 🔄 Phase 2: Git Service & Content Pipeline (IN PROGRESS)

- [ ] **Create git service** for repository operations (`src/services/git-service/`)
- [ ] **Implement repository cloning** and update functionality
- [ ] **Add change detection** for incremental updates
- [ ] **Create content processor** for markdown files (`src/services/content-processor/`)
- [ ] **Add YAML processor** for API reference files
- [ ] **Implement metadata extraction** from frontmatter
- [ ] **Create .env.example** with all required environment variables

### 📋 Phase 3: RAG Service Implementation (PENDING)

- [ ] **Create RAG service structure** in `src/services/roblox-rag/`
- [ ] **Implement embedding service** for OpenAI integration
- [ ] **Create vector store service** for ChromaDB operations
- [ ] **Add document chunking strategy** for optimal embeddings
- [ ] **Implement semantic search functionality** with metadata filtering
- [ ] **Add content classification** (guides vs tutorials vs API references)

### 📋 Phase 4: MCP Tools Development (PENDING)

- [ ] **Create `searchRobloxDocs` tool** for semantic search across all content
- [ ] **Create `getRobloxApiReference` tool** for YAML API details
- [ ] **Create `findRobloxTutorials` tool** for tutorial-specific search
- [ ] **Create `getRobloxGuides` tool** for guide-specific search
- [ ] **Register all tools** in MCP server configuration
- [ ] **Add comprehensive input validation** with Zod schemas

### 📋 Phase 5: Performance & Production Readiness (PENDING)

- [ ] **Add Redis caching layer** for frequent queries
- [ ] **Implement embedding cache** to avoid re-computation
- [ ] **Create query result caching** with TTL
- [ ] **Add performance monitoring** and metrics
- [ ] **Optimize vector search** with proper indexing
- [ ] **Add comprehensive error handling** and logging
- [ ] **Create automated testing suite**

## 🔧 Technical Stack

### Core Technologies

- **Runtime**: Node.js 20+ with TypeScript
- **MCP SDK**: `@modelcontextprotocol/sdk` (v1.13.1+)
- **Vector Database**: ChromaDB with TypeScript client
- **Embeddings**: OpenAI `text-embedding-3-large`
- **Content Source**: GitHub repository (Roblox/creator-docs)
- **Git Operations**: simple-git for cloning and updates
- **Document Processing**: markdown-it for parsing
- **Caching**: Redis (optional)

### Core Dependencies (Already Added)

```json
{
  "chromadb": "^1.8.1",
  "simple-git": "^3.20.0", 
  "markdown-it": "^14.0.0",
  "redis": "^4.6.0",
  "@types/markdown-it": "^14.0.0",
  "yaml": "^2.3.4"
}
```

### Removed Template Dependencies

For simplification, the following template features were removed:
- Complex OAuth proxy configurations  
- Supabase integration
- OpenRouter LLM provider
- Natural language date parsing (chrono-node)
- Complex authentication flows

The project now focuses solely on core MCP server functionality with Roblox documentation RAG capabilities.

## 📁 Project Structure Extensions

```
src/
├── services/
│   ├── git-service/             # Git operations
│   │   ├── gitService.ts        # Clone, pull, status operations
│   │   └── changeDetector.ts    # File change detection
│   ├── content-processor/       # Content processing
│   │   ├── markdownProcessor.ts # Markdown parsing and processing
│   │   ├── yamlProcessor.ts     # YAML API reference processing
│   │   ├── contentClassifier.ts # Content type classification
│   │   └── metadataExtractor.ts # Frontmatter and metadata extraction
│   └── roblox-rag/             # RAG service implementation
│       ├── robloxRagService.ts  # Main RAG service
│       ├── embeddingService.ts  # OpenAI embeddings
│       ├── vectorStore.ts       # ChromaDB integration
│       ├── searchService.ts     # Semantic search functionality
│       └── types.ts             # RAG-specific types
├── mcp-server/tools/
│   ├── searchRobloxDocs/        # Semantic search tool
│   ├── getRobloxApiReference/   # API reference tool
│   ├── findRobloxTutorials/     # Tutorial-specific search
│   └── getRobloxGuides/         # Guide-specific search
├── data/
│   └── roblox-docs/            # Git clone of creator-docs repository
└── config/
    └── roblox-config.ts         # Roblox-specific configuration
```

## 🌍 Environment Variables

### Required Environment Variables

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# ChromaDB Configuration
CHROMA_DB_URL=http://localhost:8000
CHROMA_DB_COLLECTION=roblox-docs

# Roblox Documentation Configuration
ROBLOX_DOCS_REPO_URL=https://github.com/Roblox/creator-docs.git
ROBLOX_DOCS_UPDATE_INTERVAL=24  # hours
ROBLOX_DOCS_LOCAL_PATH=./data/roblox-docs
EMBEDDING_MODEL=text-embedding-3-large
MAX_CHUNK_SIZE=1000
CHUNK_OVERLAP=200

# Optional Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_TTL=3600  # seconds
```

## 🛠️ Development Workflow

### 1. **Setup Development Environment**

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start ChromaDB (if using Docker)
docker run -p 8000:8000 chromadb/chroma

# Build project
npm run build
```

### 2. **Development Commands**

```bash
# Start MCP server (stdio)
npm run start:stdio

# Start MCP server (HTTP)
npm run start:http

# Clone/update documentation repository
npm run docs:update

# Test RAG functionality
npm run test:rag

# Run MCP inspector
npm run inspector
```

### 3. **Testing Strategy**

- **Unit Tests**: Individual service components
- **Integration Tests**: RAG pipeline end-to-end
- **MCP Tests**: Tool functionality and responses
- **Performance Tests**: Search speed and accuracy

## 📊 Expected Capabilities

### MCP Tools

1. **`searchRobloxDocs`**: Semantic search across all documentation
2. **`getRobloxApiReference`**: Fetch specific API class/method details
3. **`findRobloxExamples`**: Search for relevant code examples
4. **`getRobloxTutorials`**: Retrieve step-by-step guides

### RAG Features

- **Semantic Search**: Vector-based similarity matching
- **Metadata Filtering**: By document type, category, difficulty
- **Context Ranking**: Relevance scoring with adjustable thresholds
- **Incremental Updates**: Automatic documentation refresh

### Performance Targets

- **Search Latency**: < 500ms for semantic queries
- **Document Processing**: 100+ docs/minute ingestion rate
- **Memory Usage**: < 2GB RAM for full documentation index
- **Cache Hit Rate**: > 80% for repeated queries

## 🔍 Implementation Notes

### RAG Service Design Patterns

```typescript
// All RAG services should follow this pattern
interface RagService {
  addDocuments(documents: Array<Document>): Promise<void>;
  deleteDocuments(ids: Array<string>): Promise<void>;
  semanticSearch(
    query: string,
    options?: SearchOptions,
  ): Promise<Array<SearchResult>>;
  updateDocuments(documents: Array<Document>): Promise<void>;
}
```

### MCP Tool Implementation Pattern

```typescript
/**
 * All Roblox tools should integrate with RAG service.
 *
 * @param parameters
 */
export async function toolLogic(parameters: ToolInput): Promise<ToolOutput> {
  const results = await robloxRagService.semanticSearch(parameters.query, {
    filters: parameters.filters,
    limit: parameters.limit || 10,
    threshold: parameters.threshold || 0.7,
  });

  return formatResults(results);
}
```

## 🎯 Success Metrics

### Functional Requirements

- ✅ **Semantic Search**: Find relevant docs through natural language
- ✅ **API Reference**: Quick access to specific API documentation
- ✅ **Code Examples**: Locate relevant code snippets
- ✅ **Tutorial Discovery**: Find step-by-step guides

### Technical Requirements

- ✅ **MCP Compliance**: Full MCP 2025-03-26 specification support
- ✅ **Type Safety**: Full TypeScript coverage with Zod validation
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Logging**: Detailed operation logging and monitoring

### Performance Requirements

- ✅ **Response Time**: < 1 second for most queries
- ✅ **Scalability**: Handle 1000+ concurrent requests
- ✅ **Accuracy**: > 85% relevant results in top 5 matches
- ✅ **Availability**: 99.9% uptime for production deployment

## 🚦 Current Status

**Last Updated**: 2025-07-03

**Current Phase**: Phase 2 - Git Service & Content Pipeline

**Completed in this session**:

- ✅ Updated all development documentation for GitHub-based approach
- ✅ Added all required dependencies to package.json
- ✅ Simplified architecture by removing web scraping components
- ✅ Configured environment variables for git repository operations

**Next Steps**:

1. Create git service for cloning and updating Roblox creator-docs repository
2. Implement content processor for markdown files and YAML API references
3. Add metadata extraction and content classification
4. Set up ChromaDB vector store integration
5. Create initial MCP tools for documentation search

**Development Context**: This project is based on the `cyanheads/mcp-ts-template` and includes all production-ready utilities, error handling, and MCP server infrastructure. The focus is on extending this foundation with Roblox-specific RAG capabilities.

---

**Note**: This document should be updated as development progresses. New agents working on this project should read this document first to understand the current status and next steps.
