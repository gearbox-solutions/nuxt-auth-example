<script setup lang="ts">
const model = defineModel();
defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="space-y-1">
    <label :for="id" class="block text-sm uppercase">{{ label }}</label>

    <input v-bind="$attrs" :id="id" :name="name" v-model="model" class="rounded-md px-2 py-1" />
  </div>
</template>
