# Context for AI Agents - Roblox Documentation MCP Server

## 🤖 Quick Start for New Agents

**Project Type**: Roblox Documentation MCP Server with RAG support
**Current Status**: Phase 2 - Dependencies & Environment Setup
**Base Template**: `cyanheads/mcp-ts-template` (production-ready MCP TypeScript template)

### 🎯 What This Project Does

This MCP server enables AI agents to intelligently search and retrieve Roblox documentation through:

- **Semantic Search**: Natural language queries across all Roblox docs
- **RAG Integration**: ChromaDB vector database + OpenAI embeddings
- **Specialized Tools**: API references, tutorials, examples, guides
- **Automated Pipeline**: Web scraping and document processing

### 📋 Current Task Status

Check the latest todo list and continue from where the previous agent left off:

**Completed Tasks**:

- ✅ Updated CLAUDE.md with Roblox-specific project information
- ✅ Updated package.json metadata for roblox-docs-mcp

**Next Priority Tasks**:

- 🔄 Add dependencies for ChromaDB, Playwright, and document processing
- 📋 Create RAG service structure in `src/services/roblox-rag/`
- 📋 Implement documentation scraping pipeline
- 📋 Create MCP tools for Roblox documentation search

### 🔧 Development Commands

```bash
# Essential commands for this project
npm run build          # Build TypeScript
npm run start:stdio    # Start MCP server (stdio transport)
npm run start:http     # Start MCP server (HTTP transport)
npm run inspector      # Launch MCP inspector
npm run tree           # Generate project structure
```

## 📚 Key Files to Understand

### 1. **DEVELOPMENT_PLAN.md** (READ FIRST)

- Complete implementation roadmap
- Technical architecture details
- Phase-by-phase development plan
- Current status and next steps

### 2. **CLAUDE.md** (UPDATED)

- Project-specific guidance for AI agents
- Roblox documentation MCP server context
- Environment variables and configuration
- Implementation patterns for Roblox tools

### 3. **package.json** (UPDATED)

- Project metadata updated for roblox-docs-mcp
- Dependencies list (needs RAG-specific additions)
- Build scripts and development commands

### 4. **src/mcp-server/server.ts**

- Main MCP server entry point
- Tool registration patterns
- Server configuration and initialization

## 🏗️ Architecture Context

### Template Foundation

This project builds on `cyanheads/mcp-ts-template` which provides:

- ✅ **MCP 2025-03-26 specification** compliance
- ✅ **Production utilities** (logging, error handling, security)
- ✅ **TypeScript + Zod** validation throughout
- ✅ **Modular architecture** for easy extension
- ✅ **Transport support** (stdio, HTTP with auth)

### Roblox-Specific Extensions

We're adding:

- 🔄 **RAG Services** (`src/services/roblox-rag/`)
- 📋 **Documentation Scraper** (`src/scrapers/`)
- 📋 **Specialized MCP Tools** (`src/mcp-server/tools/`)
- 📋 **Vector Database Integration** (ChromaDB)
- 📋 **Embedding Service** (OpenAI)

## 🎪 Implementation Patterns

### RAG Service Pattern

```typescript
// All RAG services should follow this interface
interface RagService {
  addDocuments(documents: Array<Document>): Promise<void>;
  semanticSearch(
    query: string,
    options?: SearchOptions,
  ): Promise<Array<SearchResult>>;
  updateDocuments(documents: Array<Document>): Promise<void>;
}
```

### MCP Tool Pattern

```typescript
/**
 * All Roblox tools should integrate with RAG service.
 *
 * @param parameters
 * @returns ToolOutput.
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

### Tool Registration Pattern

```typescript
// Follow existing template patterns in src/mcp-server/tools/
src/mcp-server/tools/yourTool/
├── index.ts          # Barrel exports
├── logic.ts          # Core implementation with Zod schemas
└── registration.ts   # MCP server registration
```

## 🛠️ Development Environment

### Required Environment Variables

```bash
# Core MCP Configuration
MCP_TRANSPORT_TYPE=stdio
MCP_LOG_LEVEL=debug

# Roblox Documentation RAG
OPENAI_API_KEY=your_openai_api_key
CHROMA_DB_URL=http://localhost:8000
CHROMA_DB_COLLECTION=roblox-docs
ROBLOX_DOCS_REPO_URL=https://github.com/Roblox/creator-docs.git
ROBLOX_DOCS_UPDATE_INTERVAL=24
ROBLOX_DOCS_LOCAL_PATH=./data/roblox-docs
EMBEDDING_MODEL=text-embedding-3-large
MAX_CHUNK_SIZE=1000
CHUNK_OVERLAP=200

# Optional
REDIS_URL=redis://localhost:6379
```

### Dependencies to Add

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

## 🎯 Target MCP Tools

### 1. **searchRobloxDocs**

- **Purpose**: Semantic search across all Roblox documentation
- **Input**: Natural language query, optional filters
- **Output**: Ranked list of relevant documentation chunks
- **Implementation**: Uses RAG service for vector similarity search

### 2. **getRobloxApiReference**

- **Purpose**: Fetch specific API class/method documentation
- **Input**: API name, class name, method name
- **Output**: Detailed API documentation with examples
- **Implementation**: Targeted search with API-specific filters

### 3. **findRobloxExamples**

- **Purpose**: Search for relevant code examples
- **Input**: Programming concept, API usage, language preference
- **Output**: Code snippets with explanations
- **Implementation**: Filter by content type (code examples)

### 4. **getRobloxTutorials**

- **Purpose**: Retrieve step-by-step guides and tutorials
- **Input**: Topic, difficulty level, tutorial type
- **Output**: Structured tutorial content
- **Implementation**: Metadata filtering by tutorial characteristics

## 🔍 Data Sources

### Primary Sources

- **GitHub Repository**: https://github.com/Roblox/creator-docs
- **Content Directory**: `content/en-us/` - Main markdown documentation
- **API References**: YAML files for structured API data
- **File Formats**: Markdown (.md) and YAML (.yaml) files

### Content Types

- **API References**: Classes, methods, properties, events
- **Tutorials**: Step-by-step guides with code
- **Guides**: Conceptual explanations
- **Examples**: Code snippets and demonstrations

## 🚨 Important Notes

### Template Preservation

- **DO NOT** modify core template utilities unless necessary
- **DO** extend existing patterns rather than replacing them
- **FOLLOW** the established error handling and logging patterns
- **MAINTAIN** TypeScript + Zod validation throughout

### Security Considerations

- **API Keys**: Use environment variables, never hardcode
- **Input Validation**: Use Zod schemas for all inputs
- **Rate Limiting**: Implement for external API calls
- **Sanitization**: Clean all scraped content before processing

### Performance Targets

- **Search Latency**: < 500ms for semantic queries
- **Memory Usage**: < 2GB RAM for full documentation index
- **Cache Hit Rate**: > 80% for repeated queries
- **Document Processing**: 100+ docs/minute ingestion rate

## 🔄 Development Workflow

### 1. **Understand Current State**

- Read DEVELOPMENT_PLAN.md for complete context
- Check todo list for current tasks
- Review completed work in CLAUDE.md and package.json

### 2. **Continue Implementation**

- Start with highest priority pending tasks
- Follow established patterns from the template
- Add comprehensive error handling and logging
- Include TypeScript types and Zod validation

### 3. **Testing Strategy**

- Test individual components in isolation
- Test MCP tool functionality end-to-end
- Verify RAG pipeline performance
- Use MCP inspector for debugging

### 4. **Documentation Updates**

- Update DEVELOPMENT_PLAN.md with progress
- Add new environment variables to CLAUDE.md
- Document any architectural decisions
- Update todo list status

## 📞 Getting Help

### Template Resources

- **Original Template**: https://github.com/cyanheads/mcp-ts-template
- **MCP Specification**: https://github.com/modelcontextprotocol/modelcontextprotocol
- **Template Documentation**: Extensive README and docs/ folder

### Roblox Resources

- **Roblox Creator Hub**: https://create.roblox.com/docs
- **Roblox API Reference**: https://create.roblox.com/docs/reference/engine
- **Developer Forum**: https://devforum.roblox.com

### Development Tools

- **MCP Inspector**: `npm run inspector` for debugging
- **ChromaDB Docs**: https://docs.trychroma.com/
- **OpenAI Embeddings**: https://platform.openai.com/docs/guides/embeddings

---

**Remember**: This is a production-ready project built on a solid foundation. Focus on extending the existing architecture rather than rebuilding core functionality. The template provides excellent patterns to follow.
