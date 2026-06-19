import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { proxyConfig } from "./proxy.config.js";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: proxyConfig,
  },
});
