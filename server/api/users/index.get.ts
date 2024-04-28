import getDatabase from "~/database/database";
import users from "~/database/schema/users";

export default defineEventHandler(async (event) => {
  // Require a user session (send back 401 if no `user` key in session)
  // const session = await requireUserSession(event);

  const db = await getDatabase();
  // Send back the user
  const userList = await db.select({ name: users.name, id: users.id }).from(users).limit(10);

  return userList;
});
