import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#components': path.resolve(__dirname, './src/components'),
      '#lib': path.resolve(__dirname, './src/lib'),
    },
  },

});
