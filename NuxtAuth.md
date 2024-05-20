# User Registration and Authentication with Nuxt.js

## Introduction
User registration and authentication is an extremely common requirement in web apps. This recipe will show you how to implement basic user registration and authentication in you Nuxt app. We'll use [nuxt-aut-utils](https://github.com/Atinux/nuxt-auth-utils) to handle the authentication and session management.

In this recipe we'll be using [Drizzle](https://orm.drizzle.team/) with [db0](https://db0.unjs.io/) for database queries, but you can use any ORM or database connection strategy you prefer.

You'll need a `users` table in your database with the following columns:
- `id` (int, primary key, auto increment)
- `email` (varchar)
- `password` (varchar)

## Steps

### 1. Install nuxt-auth-utils
```bash
pnpm install nuxt-auth-utils
```

### 2. Create a registration page
Create a new page in your Nuxt app for user registration. This page should have a form with fields for email and password. The form should submit a POST request to `/api/register` with the email and password.

```vue
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
```

### 3. Create an API route for registration
Create a new API route in your Nuxt app for user registration. This route should accept a POST request with the email and password in the request body. It should hash the password and insert the user into the database. This route will only accept POST requests, so we'll name the file with `.post.ts` to indicate that. 

```typescript [server/api/register.post.ts]
import users from "~/database/schema/users";
import getDatabase from "~/database/database";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const db = await getDatabase();

  const passwordHash = bcrypt.hashSync(body.password, 12);
  await db.insert(users).values({
    name: body.name,
    email: body.email,
    password: passwordHash,
  });

  await sendRedirect(event, "/", 302);
});
```

### 4. Create a login page
Create a new page in your Nuxt app for user login. This page should have a form with fields for email and password. The form should submit a POST request to `/api/login` with the email and password.

```vue [pages/login.vue]
<script setup lang="ts">
import { ref } from "vue";
import ButtonPrimary from "~/components/ButtonPrimary.vue";

const loginForm = ref({
  email: '',
  password: '',
});
</script>

<template>
  <ContentWidthContainer>
    <form action="/api/auth/login" method="post" class="space-y-2">
      <div class="space-y-4">
        <LabeledInput v-model="loginForm.email" name="email" id="email" label="Email" />

        <LabeledInput
          v-model="loginForm.password"
          name="password"
          id="password"
          label="Password"
          type="password"
          required
        />
      </div>

      <div class="pt-2">
        <ButtonPrimary type="submit">Login</ButtonPrimary>
      </div>
    </form>
  </ContentWidthContainer>
</template>
```
