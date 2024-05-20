import users from "~/database/schema/users";
import getDatabase from "~/database/database";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const db = await getDatabase();

  const user = (await db.select().from(users).where(eq(users.email, body.email)).limit(1))?.[0];

  // compare the password hash
  if (!user || !bcrypt.compareSync(body.password, user.password)) {
    // return an error if the user is not found or the password doesn't match
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  // set the session
  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
    },
    loggedInAt: new Date(),
  });

  await sendRedirect(event, "/", 302);
});
