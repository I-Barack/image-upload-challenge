import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,
    proxy: {
      "/uploads": "https://image-upload-challenge-1.onrender.com",
    },
  },
  plugins: [react(), tailwindcss()],
});
