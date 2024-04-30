import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@pages": resolve(__dirname, "src/pages"),
            "@router": resolve(__dirname, "src/router"),
            "@components": resolve(__dirname, "src/components"),
            "@assets": resolve(__dirname, "src/assets"),
            "@data": resolve(__dirname, "src/assets/data"),
            "@constants": resolve(__dirname, "src/constants"),
            "@store": resolve(__dirname, "src/store"),
            "@services": resolve(__dirname, "src/services"),
            "@utils": resolve(__dirname, "src/utils"),
        },
    },
    server: {
        port: 3000,
    },
});
