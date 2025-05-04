import { dispatchRequest } from '@/requestDispatcher';
import type { LSPRequest } from '@/types/lsprequests';

let buffer = '';
let contentLength = -1;

process.stdin.setEncoding('utf8');
process.stdin.resume();

process.stdin.on('data', chunk => {
    buffer += chunk;

    while (true) {
        if (contentLength < 0) {
            const headerEnd = buffer.indexOf('\r\n\r\n');
            if (headerEnd === -1) break;

            const header = buffer.slice(0, headerEnd);
            const match = header.match(/Content-Length: (\d+)/i);

            if (!match) {
                console.error('Header mal formé :', header);
                break;
            }

            contentLength = parseInt(match[1], 10);
            buffer = buffer.slice(headerEnd + 4);
        }

        if (buffer.length < contentLength) break;

        const message = buffer.slice(0, contentLength);
        buffer = buffer.slice(contentLength);
        contentLength = -1;

        try {
            const json = JSON.parse(message) as LSPRequest;

            dispatchRequest(json);
        } catch (e) {
            console.error('Erreur lors du parsing JSON LSP :', e);
        }
    }
});
