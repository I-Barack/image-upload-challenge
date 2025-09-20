import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, "");

  return defineConfig({
    server: {
      open: true,
      proxy: {
        "/api/uploads": {
          target: env.SERVER_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react(), tailwindcss()],
  });
};
