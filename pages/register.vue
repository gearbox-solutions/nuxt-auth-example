<script setup lang="ts">
const form = ref({
  name: "",
  email: "",
  password: "",
});

const error = ref(null);

async function submitForm() {
  // clear any previous errors
  error.value = null;

  // perform the login
  try {
    await $fetch("/api/register", {
      method: "POST",
      body: form.value,
    });
  } catch (e) {
    // if there's an error, set the error message and return early
    error.value = "Error Registering User";
    return;
  }
  // refresh the session status now that the user is logged in
  const { fetch } = useUserSession();
  await fetch();
  // you may want to use something like Pinia to manage global state of the logged-in user
  // update Pinia state here...

  // take the user to the auth-only users index page now that they're logged in
  await navigateTo("/users");

  // Alternative - Don't use Nuxt Router here so that we can easily trigger a whole page load and get the whole UI refreshed now that the user is logged in.
  // window.location.href = "/users";
}
</script>

<template>
  <ContentWidthContainer>
    <form class="space-y-2" @submit.prevent="submitForm">
      <LabeledInput label="Name" id="name" name="name" v-model="form.name" />

      <LabeledInput label="Email" id="email" name="email" v-model="form.email" />

      <LabeledInput label="Password" id="password" name="password" type="password" v-model="form.password" />

      <div class="pt-2">
        <ButtonPrimary type="submit">Register</ButtonPrimary>
      </div>

      <div v-if="error" class="text-red-400">{{ error }}</div>
    </form>
  </ContentWidthContainer>
</template>
