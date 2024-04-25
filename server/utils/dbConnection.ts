import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const { database } = useRuntimeConfig();

const connection = await mysql.createConnection({
  host: database.host,
  port: database.port,
  database: database.database,
  user: database.username,
  password: database.password,
});
const db = drizzle(connection);

export default db;
