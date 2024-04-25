import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

// get the database configuration from dotenv
import "dotenv/config";

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ?? 3306,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });
  const db = drizzle(connection);

  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, { migrationsFolder: "./database/migrations" });
  // Don't forget to close the connection, otherwise the script will hang
  await connection.end();
}

run()
  .catch((e) => {
    console.error("Migrations failed");
    console.error(e);
    process.exit(1);
  })
  .then(() => console.log("Migrations ran successfully"));
