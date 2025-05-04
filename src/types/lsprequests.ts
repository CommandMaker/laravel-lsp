import type { integer, LSPAny, LSPArray, LSPObject } from '@/types/lsptypes';

/**
 * All messages should have a jsonrpc key
 */
export interface LSPMessage {
    jsonrpc: string;
}

/**
 * This interface define a request sent by the client
 */
export interface LSPRequest extends LSPMessage {
    /**
     * The id represent the unique identifier of an LSP request
     * It is sent to the client when responding to identify the response
     */
    id: integer | string;

    /**
     * The method is the type of request we are dealing with
     */
    method: string;

    /**
     * The parameters of the request, if any.
     * Used to pass values to the server
     */
    params?: LSPObject | LSPArray;
}

export interface LSPResponse<T> extends LSPMessage {
    /**
     * The id of the response.
     * Sent in the request, null in case of a notification
     */
    id: integer | string | null;

    /**
     * The result of the request, if any.
     * Used to send data back to the client
     * Must not be present if an error occured
     */
    result?: T;

    /**
     * The error, if any.
     */
    error?: LSPResponseError;
}

export interface LSPResponseError {
    /**
     * The code of the error.
     * Used to identify the error.
     * Provided in the ErrorCode namespace
     */
    code: integer;

    /**
     * A description of the error
     */
    message: string;

    /**
     * The data to be sent back, if any
     */
    data?: LSPAny;
}
