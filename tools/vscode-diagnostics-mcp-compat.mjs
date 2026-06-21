import {
  ErrorCode,
  ListToolsRequestSchema,
  CallToolRequestSchema,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const diagnosticsMcpUrl = process.env.VSCODE_DIAGNOSTICS_MCP_URL ?? 'http://127.0.0.1:3846/mcp';
const requestTimeoutMs = Number(process.env.VSCODE_DIAGNOSTICS_MCP_TIMEOUT_MS ?? 10_000);

const tools = [
  {
    name: 'get_all_diagnostics',
    description: 'Get all VS Code diagnostics from the workspace.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_workspace_health',
    description: 'Get workspace health score based on VS Code diagnostics.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_errors',
    description: 'Get only error-level VS Code diagnostics from the workspace.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_warnings',
    description: 'Get only warning-level VS Code diagnostics from the workspace.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'get_info',
    description: 'Get only info-level VS Code diagnostics from the workspace.',
    inputSchema: { type: 'object', properties: {} }
  }
];

const server = new Server(
  {
    name: 'vscode-diagnostics-mcp-compat',
    version: '0.1.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;

  if (!tools.some((tool) => tool.name === toolName)) {
    throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${toolName}`);
  }

  return callDiagnosticsExtension(toolName, request.params.arguments ?? {});
});

const transport = new StdioServerTransport();
await server.connect(transport);

async function callDiagnosticsExtension(name, args) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(diagnosticsMcpUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name,
          arguments: args
        }
      }),
      signal: controller.signal
    });

    if (!response.ok || !response.body) {
      throw new McpError(
        ErrorCode.InternalError,
        `VS Code diagnostics endpoint returned HTTP ${response.status}`
      );
    }

    const message = await readFirstSseJson(response.body, controller.signal);

    if (message.error) {
      throw new McpError(
        message.error.code ?? ErrorCode.InternalError,
        message.error.message ?? 'VS Code diagnostics endpoint returned an error',
        message.error.data
      );
    }

    return message.result;
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }

    const message =
      error instanceof Error && error.name === 'AbortError'
        ? `Timed out waiting for VS Code diagnostics endpoint at ${diagnosticsMcpUrl}`
        : `Failed to call VS Code diagnostics endpoint at ${diagnosticsMcpUrl}: ${String(error)}`;

    throw new McpError(ErrorCode.InternalError, message);
  } finally {
    clearTimeout(timeout);
  }
}

async function readFirstSseJson(body, signal) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (!signal.aborted) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      const message = extractSseJsonMessage(buffer);

      if (message) {
        await reader.cancel();
        return message;
      }
    }
  } finally {
    reader.releaseLock();
  }

  throw new McpError(
    ErrorCode.InternalError,
    'VS Code diagnostics endpoint closed without returning an MCP response'
  );
}

function extractSseJsonMessage(buffer) {
  for (const event of buffer.split(/\r?\n\r?\n/)) {
    const dataLines = event
      .split(/\r?\n/)
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice('data:'.length).trimStart());

    if (dataLines.length === 0) {
      continue;
    }

    try {
      return JSON.parse(dataLines.join('\n'));
    } catch {
      continue;
    }
  }

  return undefined;
}
