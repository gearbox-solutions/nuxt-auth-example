<script setup lang="ts"></script>

<template>
  <div>
    <form action="/api/register" method="post">
      <div><input id="email" type="text" placeholder="someone@acme.com" value="me@company.com" /></div>

      <div><input id="password" type="password" placeholder="Password" value="password" /></div>

      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>
