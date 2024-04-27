<script setup lang="ts">
import ContentWidthWrapper from "~/components/ContentWidthWrapper.vue";

// const { loggedIn, user, session, clear } = useUserSession();

const { data: user } = await useFetch("/api/auth/me");
</script>

<template>
  <div class="bg-gray-900">
    <ContentWidthWrapper>
      <div class="flex">
        <NuxtLink href="/" class="px-4 py-2 hover:bg-gray-800">Home</NuxtLink>

        <NuxtLink href="/users" class="px-4 py-2 hover:bg-gray-800">Users</NuxtLink>
      </div>

      <div class="flex items-center" v-if="!user">
        <NuxtLink href="/register" class="px-4 py-2 hover:bg-gray-800">Register</NuxtLink>

        <NuxtLink href="/login" class="px-4 py-2 hover:bg-gray-800">Login</NuxtLink>
      </div>

      <div v-if="user" class="flex items-center gap-x-4">
        <div class="">Hello, {{ user.name }}</div>

        <form action="/api/auth/logout" method="post">
          <button class="px-4 py-2 hover:bg-gray-800">Log Out</button>
        </form>
      </div>
    </ContentWidthWrapper>
  </div>
</template>
