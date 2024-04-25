<script setup lang="ts">
import NavBar from "~/components/nav/NavBar.vue";
import ContentWidthWrapper from "~/components/ContentWidthWrapper.vue";
</script>

<template>
  <div>
    <NavBar />

    <ContentWidthWrapper class="py-8">
      <slot />
    </ContentWidthWrapper>
  </div>
</template>
