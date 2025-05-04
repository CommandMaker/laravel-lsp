import { initializeRequest } from '@/controllers/initialize';
import { ErrorCodes } from '@/types/errorcodes';
import type { LSPRequest, LSPResponse } from '@/types/lsprequests';

const requests: Record<
    string,
    (request: LSPRequest) => LSPResponse<any> | undefined
> = {
    initialize: initializeRequest,
    initialized: () => undefined
};

/**
 * Send the given response to the client in a JSONRPC format
 *
 * @params {LSPResponse<any>} response
 */
const sendResponse = (response: LSPResponse<any>): void => {
    const serialized = JSON.stringify(response);
    const byteSize = Buffer.from(serialized).byteLength;

    process.stdout.write(
        ['Content-Length: ', byteSize, '\r\n\r\n', serialized].join('')
    );
};

/**
 * Dispatch the received request to the corresponding controller
 *
 * @params {LSPRequest} request
 */
export const dispatchRequest = (request: LSPRequest): void => {
    if (requests[request.method] === undefined)
        sendResponse({
            id: request.id,
            jsonrpc: '2.0',
            error: {
                code: ErrorCodes.MethodNotFound,
                message: 'The method is unsupported by this server'
            }
        });

    const result = requests[request.method](request);

    if (result === undefined) return;

    sendResponse(result);
};
