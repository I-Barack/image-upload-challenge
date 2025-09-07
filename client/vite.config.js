import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,
    proxy: {
      "/uploads": "http://localhost:4000",
    },
  },
  plugins: [react(), tailwindcss()],
});
