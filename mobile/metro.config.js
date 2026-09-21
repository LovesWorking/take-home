const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

// Monorepo root (contains pnpm-workspace.yaml)
const monorepoRoot = path.resolve(__dirname, '..');

const config = getDefaultConfig(__dirname);

// 1. Watch the whole monorepo so edits in `shared/` hot-reload here.
config.watchFolders = [monorepoRoot];

// 2. Resolve modules from this package first, then the hoisted root node_modules
//    (pnpm with node-linker=hoisted puts most deps at the root).
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
