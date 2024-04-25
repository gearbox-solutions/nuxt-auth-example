<script setup lang="ts">
import NavBar from "~/components/nav/NavBar.vue";
import ContentWidthWrapper from "~/components/ContentWidthWrapper.vue";

useHead({
  htmlAttrs: {
    class: "dark",
  },
  bodyAttrs: {
    class: "bg-gray-700 text-gray-200",
  },
});
</script>

<template>
  <div>
    <NavBar />

    <ContentWidthWrapper class="py-8">
      <slot />
    </ContentWidthWrapper>
  </div>
</template>
