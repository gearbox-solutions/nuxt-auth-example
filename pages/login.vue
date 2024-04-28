<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const loginForm = ref({
  email: "david@gearboxgo.com",
  password: "password",
});
</script>

<template>
  <ContentWidthContainer>
    <form action="/api/auth/login" method="post" class="space-y-2">
      <div class="flex gap-x-4">
        <label for="email">Email:</label>

        <input id="email" name="email" type="email" v-model="loginForm.email" required class="rounded-md px-2 py-1" />
      </div>

      <div class="flex gap-x-4">
        <label for="password">Password:</label>

        <input
          id="password"
          name="password"
          type="password"
          v-model="loginForm.password"
          required
          class="rounded-md px-2 py-1"
        />
      </div>

      <button type="submit" class="rounded-md bg-gray-600 px-4 py-2">Login</button>
    </form>
  </ContentWidthContainer>
</template>
