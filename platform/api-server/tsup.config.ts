import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  external: [
    "@ceilgas/adapters",
    "@ceilgas/core",
    "@ceilgas/services",
    "undici",
  ],
});
