import getDatabase from "~/database/database";
import users from "~/database/schema/users";
import { eq } from "drizzle-orm";
import loggedInMiddleware from "~/server/utils/LoggedInMiddleware";

export default defineEventHandler(async (event) => {
  await loggedInMiddleware(event);
  // Require a user session (send back 401 if no `user` key in session)
  // const session = await requireUserSession(event);

  const id = getRouterParam(event, "id");

  const db = await getDatabase();
  // Send back the user
  const queryResult = await db.select().from(users).where(eq(users.id, id)).limit(1);
  const user = queryResult?.[0];

  return user;
});
