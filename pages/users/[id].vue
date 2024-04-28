<script setup lang="ts">
const route = useRoute();
const { id } = route.params;

const { data: user } = await useFetch(`/api/users/${id}`);

definePageMeta({
  middleware: ["redirect-if-not-authenticated"],
});
</script>

<template>
  <ContentWidthContainer>
    <div>This page requires you to be logged in.</div>

    <div>User {{ id }}</div>

    <div>{{ user.name }}</div>
  </ContentWidthContainer>
</template>
