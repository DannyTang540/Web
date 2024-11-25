import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "26.225.63.179", // Cho phép kết nối từ bất kỳ địa chỉ IP nào
    port: 5173, // Cổng mà bạn muốn chạy Vite
    strictPort: true, // Đảm bảo sử dụng cổng này (nếu cổng đã được sử dụng, Vite sẽ dừng lại)
  },
});
