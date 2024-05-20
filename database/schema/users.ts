import { bigint, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export default mysqlTable("users", {
  id: bigint("id", { mode: "number" }).autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
