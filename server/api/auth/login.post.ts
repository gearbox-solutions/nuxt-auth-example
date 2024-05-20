export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  auth.attempt(event, body.email, body.password);

  await sendRedirect(event, "/", 302);
});
