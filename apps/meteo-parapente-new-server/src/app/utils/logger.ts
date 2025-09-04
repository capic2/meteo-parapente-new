import { pino } from 'pino';

export const logger = pino({
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
});
