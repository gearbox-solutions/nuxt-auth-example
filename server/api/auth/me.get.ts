export default defineEventHandler(async (event) => {
  const user = await auth.user(event);

  return {
    id: user.id,
    name: user.name,
  };
});
