<script setup lang="ts">
import { ref } from "vue";
import ButtonPrimary from "~/components/ButtonPrimary.vue";
import useUserStore from "~/stores/user";

const store = useUserStore();

const loginForm = ref({
  email: "",
  password: "",
});

const error = ref(null);

async function submitForm() {
  // clear any previous errors
  error.value = null;

  // perform the login
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: loginForm.value,
    });
  } catch (e) {
    // if there's an error, set the error message and return early
    error.value = "Error logging in";
    return;
  }

  // refresh the session status now that the user is logged in
  const { fetch } = useUserSession();
  await fetch();
  // you may want to use something like Pinia to manage global state of the logged-in user
  // update Pinia state here...
  await store.refreshUser();

  // take the user to the auth-only users index page now that they're logged in
  await navigateTo("/users");

  // Alternative - Don't use Nuxt Router here so that we can easily trigger a whole page load and get the whole UI refreshed now that the user is logged in.
  // window.location.href = "/users";
}
</script>

<template>
  <ContentWidthContainer>
    <form class="space-y-2" @submit.prevent="submitForm">
      <LabeledInput v-model="loginForm.email" name="email" id="email" label="Email" autocomplete="username" />

      <LabeledInput
        v-model="loginForm.password"
        name="password"
        id="password"
        label="Password"
        type="password"
        required
        autocomplete="current-password"
      />

      <div class="pt-2">
        <ButtonPrimary type="submit">Login</ButtonPrimary>
      </div>

      <div v-if="error" class="text-red-400">{{ error }}</div>
    </form>
  </ContentWidthContainer>
</template>
