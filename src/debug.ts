import { writeFileSync } from 'fs';
import { join } from 'path';

type LogLevel = 'INFO' | 'WARN' | 'FATAL';

/**
 * Format the message to log to give more informations
 *
 * @params {string} message
 * @params {LogLevel} level
 * @returns {string}
 */
const formatMessage = (message: string, level: LogLevel): string => {
    let buffer = '[';
    const date = new Date();

    buffer += `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}] `;
    buffer += `[${level}] `;
    buffer += message;

    return buffer;
};

/**
 * Log the given message to the log file
 *
 * @params {string} message
 * @params {LogLevel} level
 * @returns {void}
 */
export const debugData = (data: string, level: LogLevel = 'INFO'): void =>
    writeFileSync(join(__dirname, '../log.txt'), formatMessage(data, level));
