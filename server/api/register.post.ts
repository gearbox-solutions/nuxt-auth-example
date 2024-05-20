import users from "~/database/schema/users";
import getDatabase from "~/database/database";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  // read the body of the request
  const body = await readBody(event);

  // get the database connection
  const db = await getDatabase();

  // hash the password before storing it in the database
  const passwordHash = bcrypt.hashSync(body.password, 12);

  // insert the user into the database
  await db.insert(users).values({
    name: body.name,
    email: body.email,
    password: passwordHash,
  });

  // log the user in as the user that was just created
  const user = (await db.select().from(users).where(eq(users.email, body.email)).limit(1))[0];
  await auth.login(event, user);

  // redirect the user to the home page after logging in
  await sendRedirect(event, "/", 302);
});
