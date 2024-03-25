import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/main.ts"),
            formats: ["es"],
        }
    },
    resolve: {
        alias: {
            src: resolve("src/"),
        }
    },
    plugins: [
        dts(),
    ],
})