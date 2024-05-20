import getDatabase from "~/database/database";
import users from "~/database/schema/users";
import { eq } from "drizzle-orm";
import requireUserLoggedIn from "~/server/utils/requireUserLoggedIn";

export default defineEventHandler(async (event) => {
  await requireUserLoggedIn(event);
  // Require a user session (send back 401 if no `user` key in session)
  // const session = await requireUserSession(event);

  const id = getRouterParam(event, "id");

  const db = await getDatabase();
  // Send back the user
  const queryResult = await db
    .select({ id: users.id, name: users.name, email: users.email, createdAt: users.createdAt })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  const user = queryResult?.[0];

  return user;
});
