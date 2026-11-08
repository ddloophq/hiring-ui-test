// Validates env vars at build/dev time. Set SKIP_ENV_VALIDATION=1 to skip.
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

export default config;
