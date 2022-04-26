import * as path from 'path';
import {defineConfig} from 'vite';
import {createVuePlugin as vue} from 'vite-plugin-vue2';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/makeless.ts'),
      name: 'Makeless',
      fileName: (format) => `makeless.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});