
import { env } from "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${env.API_URL}/v1/:path*`,
      },
    ];
  } 
};

export default config;
