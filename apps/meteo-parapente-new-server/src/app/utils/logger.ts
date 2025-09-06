import { pino } from 'pino';

export const pinoConfig = {
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      {
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
