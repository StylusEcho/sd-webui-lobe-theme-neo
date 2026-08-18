import react from '@vitejs/plugin-react-swc';
import { consola } from 'consola';
import dotenv from 'dotenv';
import { resolve } from 'node:path';
import * as process from 'node:process';
import { defineConfig } from 'vite';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const SD_HOST = process.env.SD_HOST || '127.0.0.1';
const SD_PORT = process.env.SD_PORT || 7860;

consola.info('Proxy:', `http://${SD_HOST}:${SD_PORT}`);
export default defineConfig({
  base: '/dev',
  build: {
    cssMinify: true,
    emptyOutDir: true,
    minify: 'terser',
    outDir: './javascript',
    rollupOptions: {
      input: resolve(__dirname, 'src/main.tsx'),
      output: {
        assetFileNames: `[name].[ext]`,
        chunkFileNames: `[name].js`,
        // The entry chunk is loaded by the WebUI as a plain <script src="...">,
        // not <script type="module">. Splitting PromptHighlight/ImageInfo/InfoBox
        // into lazily-imported chunks (see src/app/index.tsx and
        // src/features/Share/PreviewInner.tsx) means those chunks now share
        // helpers with the entry, so Rollup emits a top-level `export {...}` in
        // it to hand those back — a syntax error in a non-module script, which
        // fails completely silently there: the WebUI's own script.js loads fine
        // beforehand, so no error surfaces beyond "Uncaught SyntaxError" on this
        // one script tag, and the page just never mounts.
        //
        // The WebUI only special-cases loading by extension (see
        // `javascript_html()` in modules/ui_gradio_extensions.py): any .mjs file
        // in an extension's javascript/ folder gets `<script type="module">`
        // instead of a plain <script>, which is exactly what this needs. Chunk
        // files stay .js — they're only ever reached via dynamic import(), which
        // always evaluates its target as a module regardless of file extension
        // or how the importing script itself was loaded.
        entryFileNames: `[name].mjs`,
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  plugins: [
    react({ devTarget: 'esnext', tsDecorators: true }),

    !isProduction && {
      configureServer: (server) => {
        server.middlewares.use((_request, res, next) => {
          res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
          res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-non');
          next();
        });
      },
      name: 'configure-response-headers',
    },
    !isProduction && {
      configureServer: (server) => {
        server.middlewares.use(async (_request, res, next): Promise<void> => {
          if (
            _request.originalUrl === '/dev' ||
            _request.originalUrl === '/dev?__theme=dark' ||
            _request.originalUrl === '/dev?__theme=light'
          ) {
            const response = await fetch(`http://${SD_HOST}:${SD_PORT}/`);

            let updatedResponse = await response.text();

            const toAdd = `
                        <script type="module" src="/dev/src/_react_refresh.js"></script>
                        <script type="module" src="/dev/src/main.tsx"></script>
                       `;
            updatedResponse = updatedResponse.replace('</body>', `</body>${toAdd}`);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('charset', 'utf8');
            res.end(updatedResponse);
            return;
          }
          next();
        });
      },
      name: 'route-default-to-index',
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 8000,
    proxy: {
      '/queue/join': {
        target: `ws://${SD_HOST}:${SD_PORT}`,
        ws: true,
      },
      '^(?!.*dev).*$': `http://${SD_HOST}:${SD_PORT}`,
    },
  },
});
