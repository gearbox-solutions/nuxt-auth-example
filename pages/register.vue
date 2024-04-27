<script setup lang="ts"></script>

<template>
  <div>
    <form action="/api/register" method="post" class="space-y-2">
      <div>
        <input id="name" name="name" type="text" placeholder="John Doe" value="David Nahodyl" />
      </div>

      <div>
        <input id="email" type="text" name="email" placeholder="someone@acme.com" value="david@gearboxgo.com" />
      </div>

      <div>
        <input id="password" name="password" type="password" placeholder="Password" value="password" />
      </div>

      <div>
        <button type="submit" class="rounded-md bg-gray-600 px-4 py-2">Register</button>
      </div>
    </form>
  </div>
</template>
