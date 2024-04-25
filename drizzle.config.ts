import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./database/schema/",
  out: "./database/migrations/",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ?? 3306,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  verbose: true,
} satisfies Config;
