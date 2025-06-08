/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: [
      '**/*.{test,spec}.?(c|m)[jt]s?(x)',
      '**/*.effect-{test,spec}.?(c|m)[jt]s?(x)',
    ],
    setupFiles: [
      '__tests__/libs/import-env.ts',
      '__tests__/libs/init-mock-server.ts',
    ],
  },
  plugins: [tsconfigPaths()],
});
