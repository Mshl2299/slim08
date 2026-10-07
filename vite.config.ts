import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/slim08/',
  plugins: [
    react(),
    {
      name: 'slim08-trailing-slash-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url ?? '/', 'http://localhost')

          if (url.pathname === '/slim08') {
            res.writeHead(301, {
              Location: '/slim08/',
            })
            res.end()
            return
          }

          next()
        })
      },
    },
  ],
})
