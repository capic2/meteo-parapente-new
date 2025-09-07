import { pino } from 'pino';
import { PinoLoggerOptions } from 'fastify/types/logger';

export const pinoConfig: PinoLoggerOptions = {
  transport: {
    targets: [
      {
        level: 'debug',
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      {
        level: 'debug',
        target: 'pino-pretty',
        options: {
          colorize: false,
          destination: './log.txt',
        },
      },
    ],
  },
}

export const logger = pino(pinoConfig);
