import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [
        '/services', '/case-studies', '/about', '/certifications', 
        '/process', '/blog', '/free-audit', '/contact', '/saas-websites', 
        '/cosmetic-clinic-websites', '/immigration-consultant-websites', 
        '/luxury-real-estate-websites', '/cybersecurity-it-websites'
      ],
      renderer: '@prerenderer/renderer-jsdom',
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 1000,
      },
      postProcess(renderedRoute) {
        // Ignore any redirects
        renderedRoute.html = renderedRoute.html.trim()
      }
    })
  ],
})
