import requireUserLoggedIn from "~/server/utils/requireUserLoggedIn";

export default defineEventHandler(async (event) => {
  await requireUserLoggedIn(event);

  const user = await auth.user(event);
  return {
    id: user.id,
    name: user.name,
  };
});
