/// <reference types='vitest' />
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  test: {
    setupFiles: ['vitest.setup.ts'],
    name: '@meteo-parapente-new/meteo-parapente-new-server',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },

    deps: {
      inline: ['@fastify/autoload'],
    },
  },
}));
