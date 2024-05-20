<script setup lang="ts">
import { ref } from "vue";
import ButtonPrimary from "~/components/ButtonPrimary.vue";

const loginForm = ref({
  email: "",
  password: "",
});

const error = ref(null);

async function submitForm() {
  // clear any previous errors
  error.value = null;

  // perform the login
  await $fetch("/api/auth/login", {
    method: "POST",
    body: loginForm.value,
    onResponseError: () => {
      error.value = "Error logging in";
    },
  });

  // we're not using Nuxt Router here so that we can easily trigger a whole page load and get everything refreshed now that the user is logged in
  window.location.href = "/";
}
</script>

<template>
  <ContentWidthContainer>
    <form class="space-y-2" @submit.prevent="submitForm">
      <LabeledInput v-model="loginForm.email" name="email" id="email" label="Email" />

      <LabeledInput
        v-model="loginForm.password"
        name="password"
        id="password"
        label="Password"
        type="password"
        required
      />

      <div class="pt-2">
        <ButtonPrimary type="submit">Login</ButtonPrimary>
      </div>

      <div v-if="error" class="text-red-400">{{ error }}</div>
    </form>
  </ContentWidthContainer>
</template>
