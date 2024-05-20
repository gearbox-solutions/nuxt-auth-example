import type UserType from "@/Types/User";
import type { H3Event } from "h3";
import users from "~/database/schema/users";
import { eq } from "drizzle-orm";
import getDatabase from "~/database/database";

// Logs the user in as the given user model
async function login(event: H3Event<Request>, user: UserType) {
  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
    },
    loggedInAt: new Date(),
  });
}

async function user(event) {
  const session = await getUserSession(event);

  const db = await getDatabase();
  const result = (await db.select().from(users).where(eq(users.id, session.user.id)).limit(1))?.[0];
  delete result.password;
  return result;
}

export default {
  login,
  user,
};
