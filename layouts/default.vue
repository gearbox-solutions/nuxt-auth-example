<script setup lang="ts">
import NavBar from "~/components/nav/NavBar.vue";
import ContentWidthContainer from "~/components/ContentWidthContainer.vue";
</script>

<template>
  <div>
    <NavBar />

    <ContentWidthContainer class="py-8">
      <slot />
    </ContentWidthContainer>
  </div>
</template>
