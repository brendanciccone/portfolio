import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['__tests__/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      // Next does not ship a Node-resolvable `next/server` entry; Vitest needs a concrete file for import analysis.
      'next/server': path.resolve(
        __dirname,
        'node_modules/next/dist/server/web/spec-extension/response.js',
      ),
    },
  },
})
