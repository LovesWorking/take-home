import react from '@vitejs/plugin-react';
import { createRequire } from 'node:module';
import path from 'node:path';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);
/** Absolute path to a file inside a package, bypassing its `exports` map. */
const packageFile = (pkg: string, file: string) =>
  path.join(path.dirname(require.resolve(`${pkg}/package.json`)), file);

// Buoy's devtools are React Native components. On web they run on react-native-web,
// which needs the `react-native` import aliased and the `.web.*` platform
// extensions resolved first, plus the two RN globals the packages read.
const emptyModule = path.resolve(import.meta.dirname, 'src/shims/empty-module.ts');
const webExtensions = ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.web.mjs'];
const defaultExtensions = ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'];

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    __DEV__: JSON.stringify(mode !== 'production'),
    global: 'globalThis',
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(import.meta.dirname, 'src') },
      // Buoy ships a React DOM lane as `index.web.js`, but its package.json `exports`
      // point at the native entry, so enter the web lane explicitly.
      { find: /^@buoy-gg\/core$/, replacement: packageFile('@buoy-gg/core', 'lib/module/index.web.js') },
      { find: /^@buoy-gg\/license$/, replacement: packageFile('@buoy-gg/license', 'lib/module/index.web.js') },
      // RN internals Buoy probes behind try/catch; stub them before the broad alias below.
      { find: /^react-native\/Libraries\/.*/, replacement: emptyModule },
      { find: 'react-native', replacement: 'react-native-web' },
      // Native-only optional peers Buoy probes behind try/catch (clipboard, file
      // system, async-storage, expo-router). They resolve here only because pnpm
      // hoists mobile's copies; stub them so the browser fallbacks are used.
      { find: /^(expo-[^/]+|@react-native-(clipboard|async-storage)\/[^/]+)(\/.*)?$/, replacement: emptyModule },
    ],
    extensions: [...webExtensions, ...defaultExtensions],
    // Guarantee a single React instance even though `shared` lists react as a peer.
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: [...webExtensions, ...defaultExtensions],
    },
  },
}));
