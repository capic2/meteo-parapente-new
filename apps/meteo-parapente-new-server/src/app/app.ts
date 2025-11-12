import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';

/*/!* eslint-disable-next-line *!/
export interface AppOptions {}*/

export async function app(fastify: FastifyInstance/*, opts: AppOptions*/) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    // In ESM, import.meta.dirname points to dist/src/app at runtime.
    // Plugins live in dist/src/app/plugins, so do not prefix with 'app/'.
    dir: path.join(import.meta.dirname, 'plugins'),
    options: {/* ...opts */},
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    // Routes live in dist/src/app/routes
    dir: path.join(import.meta.dirname, 'routes'),
    options: {/* ...opts */},
  });
}
