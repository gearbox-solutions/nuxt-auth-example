<script setup lang="ts">
import { ref } from "vue";
import ButtonPrimary from "~/components/ButtonPrimary.vue";

const loginForm = ref({
  email: "david@gearboxgo.com",
  password: "password",
});
</script>

<template>
  <ContentWidthContainer>
    <form action="/api/auth/login" method="post" class="space-y-2">
      <div class="space-y-4">
        <LabeledInput v-model="loginForm.email" name="email" id="email" label="Email" />

        <LabeledInput
          v-model="loginForm.password"
          name="password"
          id="password"
          label="Password"
          type="password"
          required
        />
      </div>

      <div class="pt-2">
        <ButtonPrimary type="submit">Login</ButtonPrimary>
      </div>
    </form>
  </ContentWidthContainer>
</template>
