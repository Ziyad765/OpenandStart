import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import app from './api/index.js'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-api-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.startsWith('/api') || req.url.startsWith('/applications'))) {
            return app(req, res, next);
          }
          next();
        });
      }
    }
  ]
})
