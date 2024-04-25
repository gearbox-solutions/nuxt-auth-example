<script setup lang="ts">
import ContentWidthWrapper from "~/components/ContentWidthWrapper.vue";
</script>

<template>
  <div class="bg-gray-900 text-white">
    <ContentWidthWrapper>
      <div class="flex">
        <NuxtLink href="/" class="px-4 py-2 hover:bg-gray-800">Home</NuxtLink>

        <NuxtLink href="/users" class="px-4 py-2 hover:bg-gray-800">Users</NuxtLink>
      </div>

      <div class="flex items-center">
        <NuxtLink href="/login" class="px-4 py-2 hover:bg-gray-800">Login</NuxtLink>
      </div>
    </ContentWidthWrapper>
  </div>
</template>
