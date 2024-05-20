import type UserType from "@/Types/User";
import type { H3Event } from "h3";
import users from "~/database/schema/users";
import { eq } from "drizzle-orm";
import getDatabase from "~/database/database";
import bcrypt from "bcrypt";

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

async function attempt(event: H3Event<Request>, email: string, password: string) {
  const db = await getDatabase();

  const user = (await db.select().from(users).where(eq(users.email, email)).limit(1))?.[0];

  // compare the password hash
  if (!user || !bcrypt.compareSync(body.password, password)) {
    // return an error if the user is not found or the password doesn't match
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  // log in as the selected user
  await login(event, user);

  return true;
}

export default {
  login,
  user,
};
