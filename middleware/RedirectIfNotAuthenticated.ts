export default defineNuxtRouteMiddleware(() => {
  // check if the user is logged in
  const { loggedIn } = useUserSession();

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return navigateTo("/login");
  }

  return null;
});
