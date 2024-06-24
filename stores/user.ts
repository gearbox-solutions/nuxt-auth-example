export default defineStore("user", () => {
  const user = ref(null);

  async function refreshUser() {
    const response = await $fetch("/api/auth/me");
    user.value = response;
  }

  refreshUser();

  return { user, refreshUser };
});
