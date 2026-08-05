import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    '@orderly.network/hooks',
    '@orderly.network/types',
    '@orderly.network/trading',
    '@orderly.network/ui-scaffold',
    '@orderly.network/plugin-core',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
