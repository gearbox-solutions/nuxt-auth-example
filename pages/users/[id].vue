<script setup lang="ts">
import dayjs from "dayjs";

const route = useRoute();
const { id } = route.params;

const { data: user } = await useFetch(`/api/users/${id}`);

definePageMeta({
  middleware: ["redirect-if-not-authenticated"],
});
</script>

<template>
  <ContentWidthContainer>
    <h1 class="text-3xl font-bold">{{ user.name }}</h1>

    <div>ID: {{ id }}</div>

    <div>Joined: {{ dayjs(user.createdAt).format("MMMM D, YYYY") }}</div>
  </ContentWidthContainer>
</template>
