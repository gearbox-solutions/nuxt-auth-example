<script setup lang="ts"></script>

<template>
  <ContentWidthContainer>
    <form action="/api/register" method="post" class="space-y-2">
      <LabeledInput label="Name" id="name" name="name" />

      <LabeledInput label="Email" id="email" name="email" />

      <LabeledInput label="Password" id="password" name="password" type="password" />

      <div class="pt-2">
        <ButtonPrimary type="submit">Register</ButtonPrimary>
      </div>
    </form>
  </ContentWidthContainer>
</template>
