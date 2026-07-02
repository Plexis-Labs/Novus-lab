import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/types/index.ts',
    'src/validators/index.ts',
    'src/constants/index.ts',
    'src/testing/index.ts',
    'src/utils/index.ts',
    'src/errors/index.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
})
