import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/whatif-2026-guide/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Precache EVERYTHING including big map PNGs and both PDFs so the
      // whole guide works fully offline at the festival (no cell coverage).
      includeAssets: ['**/*'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg,pdf,ico}'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallback: '/whatif-2026-guide/index.html',
      },
      manifest: {
        name: 'What If 2026 — наш план',
        short_name: 'What If 2026',
        description:
          'Расписание фестиваля What If 2026 (Merritt, BC): программа с русскими переводами, карта, гайды',
        lang: 'ru',
        start_url: '/whatif-2026-guide/',
        scope: '/whatif-2026-guide/',
        display: 'standalone',
        background_color: '#14100e',
        theme_color: '#14100e',
        orientation: 'portrait',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'pwa-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
})
