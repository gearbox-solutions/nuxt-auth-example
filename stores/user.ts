export default defineStore("user", () => {
  const user = ref(null);
  refreshUser();

  async function refreshUser() {
    const { data } = await useFetch("/api/auth/me");
    user.value = data.value;
  }

  return { user, refreshUser };
});
