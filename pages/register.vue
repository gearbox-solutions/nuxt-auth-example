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
  await $fetch("/api/register", {
    method: "POST",
    body: form.value,
    onResponseError: () => {
      error.value = "Error Registering User";
    },
  });

  // we're not using Nuxt Router here so that we can easily trigger a whole page load and get everything refreshed now that the user is logged in
  window.location.href = "/";
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
