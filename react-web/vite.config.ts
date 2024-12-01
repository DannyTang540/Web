import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Đảm bảo sử dụng cổng này (nếu cổng đã được sử dụng, Vite sẽ dừng lại)
  },
});
