import { bigint, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export default mysqlTable("users", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 255 }).unique(),
  password: text("password"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
