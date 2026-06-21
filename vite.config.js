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
  blogRoutes = blogIndex
    .filter(blog => !/^blog_\d+$/i.test(blog.title))
    .map(blog => `/blog/${blog.slug}`)
} catch (error) {
  console.warn('Could not read blogs-index.json for prerendering routes.')
}

const baseRoutes = [
  '/services', '/case-studies', '/about', '/certifications', 
  '/process', '/blog', '/free-audit', '/contact', '/saas-websites', 
  '/cosmetic-clinic-websites', '/immigration-consultant-websites', 
  '/luxury-real-estate-websites', '/cybersecurity-it-websites'
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
