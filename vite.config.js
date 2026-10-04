import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import chat from './api/chat.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'GEMINI_')
  process.env.GEMINI_API_KEY ||= env.GEMINI_API_KEY
  process.env.GEMINI_MODEL ||= env.GEMINI_MODEL

  return {
    plugins: [
      react(),
      {
        name: 'local-chat-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', chat)
        },
      },
    ],
  }
})
