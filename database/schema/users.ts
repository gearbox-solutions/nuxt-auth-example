import { mysqlTable, serial, text, timestamp } from "drizzle-orm/mysql-core";

export default mysqlTable("users", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
