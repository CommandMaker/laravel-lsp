import type { LSPRequest, LSPResponse } from '@/types/lsprequests';

type LSPInitializeResponse = {
    capabilities: object;
    serverInfo?: {
        name: string;
        version?: string;
    };
};

/**
 * Handle the 'initialize' LSP request
 */
export const initializeRequest = (
    request: LSPRequest
): LSPResponse<LSPInitializeResponse> | undefined => {
    return {
        jsonrpc: '2.0',
        id: request.id,
        result: {
            capabilities: {},
            serverInfo: {
                name: 'laravel-lsp',
                version: '0.0.1-INDEV'
            }
        }
    };
};
