export default defineStore("user", () => {
  // we could get the use name from the session, which is just storing the ID and the name, but in this example we'll
  // get additional user data from an API endpoint to demonstrate that process and keep the session data small

  const { data: user, refresh } = useFetch("/api/auth/me");

  async function refreshUser() {
    refresh();
  }

  return { user, refreshUser };
});
