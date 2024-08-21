import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'app/config/**'],
    coverage: {
      provider: 'v8',
      exclude: [
        ...coverageConfigDefaults.exclude,
        'next.config.mjs',
        'tailwind.config.js',
        'tailwind.config.ts',
        'postcss.config.js',
        'postcss.config.mjs',
      ],
      thresholds: {
        functions: 80,
        branches: 80,
        '**/index.ts': {
          statements: 0,
          functions: 0,
          branches: 0,
          lines: 0,
        },
      },
    },
    css: false,
  },
});
