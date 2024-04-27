import users from "~/database/schema/users";
import { eq } from "drizzle-orm";
import getDatabase from "~/database/database";

export default defineEventHandler(async (event) => {
  // Require a user session (send back 401 if no `user` key in session)
  const session = await requireUserSession(event);

  const db = await getDatabase();
  // Send back the user
  const user = (await db.select().from(users).where(eq(users.id, session.user.id)).limit(1))?.[0];

  return {
    id: user.id,
    name: user.name,
  };
});
