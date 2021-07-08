import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  server: {
    fs: {
      allow: ['src/'],
    },
  },
  jsx: {
    factory: 'h',
    fragment: 'Fragment'
  },
  plugins: [preact()]
});
