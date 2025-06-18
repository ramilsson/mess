import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      __APP_NAME__: JSON.stringify(env.VITE_APP_NAME),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  };
});
