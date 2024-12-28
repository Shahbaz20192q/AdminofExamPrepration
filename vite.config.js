import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/AdminofExamPrepration/", // Set the base path for the project
  plugins: [react()],
});
