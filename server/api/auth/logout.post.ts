export default defineEventHandler(async (event) => {
  // Clear the current user session
  await clearUserSession(event);

  await sendRedirect(event, "/", 302);
});
