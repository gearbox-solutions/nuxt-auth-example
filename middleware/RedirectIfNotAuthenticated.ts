export default defineNuxtRouteMiddleware((to, from) => {
  // redirect the user to the login screen if they're not authenticated

  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    return navigateTo("/login");
  }
});
