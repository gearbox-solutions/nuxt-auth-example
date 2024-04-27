import users from "~/database/schema/users";
import getDatabase from "~/database/database";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const db = await getDatabase();

  const passwordHash = bcrypt.hashSync(body.password, 12);
  await db.insert(users).values({
    name: body.name,
    email: body.email,
    password: passwordHash,
  });

  await sendRedirect(event, "/", 302);
});
