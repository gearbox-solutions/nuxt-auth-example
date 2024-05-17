<script setup lang="ts">
const { data: users } = await useFetch("/api/users");

definePageMeta({
  middleware: ["redirect-if-not-authenticated"],
});
</script>

<template>
  <ContentWidthContainer>
    <div class="pb-4 text-sm font-semibold uppercase">Users List</div>

    <div>
      <ul class="space-y-4">
        <li v-for="user in users" :key="user.id">
          <NuxtLink :to="`/users/${user.id}`">
            <div class="px-4 py-2 hover:bg-gray-600">{{ user.name }}</div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </ContentWidthContainer>
</template>
