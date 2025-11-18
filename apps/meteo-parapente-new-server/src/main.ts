import Fastify from 'fastify';
import { pinoConfig } from './app/utils/logger';
import cors from '@fastify/cors';
//@ts-expect-error no types
import fastifyListRoutes from 'fastify-list-routes';
import { config } from '@dotenvx/dotenvx';
import { makeApp } from './app/app';
import { connect } from '@meteo-parapente-new/database';

config({ path: '.env' });

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const { db } = await connect({ path: process.env.DB_FILE_NAME! });
const app = await makeApp(db);

// Instantiate Fastify with some config
const server = Fastify({
  logger: pinoConfig,
});
server.register(fastifyListRoutes, { colors: true });
server.register(cors);

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
