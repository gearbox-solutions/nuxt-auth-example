export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  await auth.attempt(event, body.email, body.password);
});
