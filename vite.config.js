import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let blogRoutes = []
try {
  const blogIndex = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'src/data/blogs-index.json'), 'utf-8'))
  blogRoutes = blogIndex.map(blog => `/blog/${blog.slug}`)
} catch (err) {
  console.warn('Could not read blogs-index.json for prerendering routes.', err)
}

const baseRoutes = [
  '/home', '/404', '/services', '/case-studies', '/about', '/certifications', 
  '/process', '/blog', '/free-audit', '/contact', '/saas-websites',
  '/philosophy', '/thank-you'
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: [...baseRoutes, ...blogRoutes],
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
