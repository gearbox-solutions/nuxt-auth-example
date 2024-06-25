export default defineStore("user", () => {
  const { data: user, refresh } = useFetch("/api/auth/me");

  async function refreshUser() {
    refresh();
  }

  return { user, refreshUser };
});
