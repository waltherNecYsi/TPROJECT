import dns from 'node:dns';
import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import eslint from 'vite-plugin-eslint';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    eslint(),
    {
      name: "load+transform-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) {
          return null;
        }

        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
  ],
  build: {
    outDir: "build",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
