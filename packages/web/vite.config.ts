import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const mode = process.env.NODE_ENV || 'development'
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'process.env.SUPABASE_URL': JSON.stringify(env.SUPABASE_URL),
      'process.env.SUPABASE_ANON_KEY': JSON.stringify(env.SUPABASE_ANON_KEY),
      'process.env.API_URL': JSON.stringify(env.API_URL),
      'process.env.TEST_SCRIPT': JSON.stringify(env.TEST_SCRIPT),
    },
    build: {
      target: 'esnext',
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    cacheDir: '../../node_modules/.vite',
  }
})
