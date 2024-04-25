<script setup lang="ts">
useHead({
  title: "Auth Tester",
  htmlAttrs: {
    class: "dark",
  },
  bodyAttrs: {
    class: "bg-gray-700 text-gray-200",
  },
});

console.log("loading fresh");
</script>
<template>
  <Head>
    <Meta name="color-scheme" content="dark" />
  </Head>

  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
