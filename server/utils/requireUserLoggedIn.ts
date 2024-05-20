export default async (event) => {
  await requireUserSession(event);
};
