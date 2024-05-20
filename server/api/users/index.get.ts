import getDatabase from "~/database/database";
import users from "~/database/schema/users";
import requireUserLoggedIn from "~/server/utils/requireUserLoggedIn";

export default defineEventHandler(async (event) => {
  await requireUserLoggedIn(event);

  const db = await getDatabase();
  // Send back the user
  const userList = await db.select({ name: users.name, id: users.id }).from(users).limit(10);

  return userList;
});
