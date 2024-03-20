import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  esbuild: {
    loader: "jsx", // Assuming you want to use the JSX loader for both .js and .jsx files
    jsxFactory: "React.createElement", // Add this line
  },
});
