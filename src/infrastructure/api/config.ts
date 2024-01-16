import("dotenv/config");

export const API_CONFIG = {
  port: process.env.PORT ?? 3000,
  version: process.env.API_VERSION ?? 'v1'
}