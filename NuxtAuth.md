# User Registration and Authentication with Nuxt.js

## Introduction
User registration and authentication is an extremely common requirement in web apps. This recipe will show you how to implement basic user registration and authentication in you Nuxt app. We'll use [nuxt-aut-utils](https://github.com/Atinux/nuxt-auth-utils) by [Atinux](https://github.com/Atinux) to handle the authentication and session management.

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

### 1a. (Optional) Add a session encryption key

Session cookies are encrypted. The encryption key is set from the `.env` file. This key will be added to your `.env` automatically when running in development mode the first time. However, you'll need to add this to your production environment before deploying.

```dotenv [.env]
NUXT_SESSION_PASSWORD=password-with-at-least-32-characters
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

This is a very simple example of registration. You would probably want to add some error handling and nice response messages.

Posting directly to this endpoint will cause the browser to redirect to the root of the site and cause a full app reload. This is an easy way to let your app refresh with any other kinds of feature and navigation updates which may be available to a logged-in user. Alternatively, you could use something like [Pinia](https://pinia.vuejs.org/) to manage global state of the currently logged-in user and update your UI accordingly.

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
        <button type="submit">Login</button>
      </div>
    </form>
  </ContentWidthContainer>
</template>
```

### 5. Create an API route for login
With the login form created, we need to create an API route to handle the login request. This route should accept a POST request with the email and password in the request body. It should check the email and password against the database and set a session cookie if the login is successful.

```typescript [server/api/auth/login.post.ts]
import users from "~/database/schema/users";
import getDatabase from "~/database/database";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

  const db = await getDatabase();

  const user = (await db.select().from(users).where(eq(users.email, body.email)).limit(1))?.[0];

  // compare the password hash
  if (!user || !bcrypt.compareSync(body.password, user.password)) {
    // throw an error if the user is not found or the password doesn't match
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  // set the session
  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
    },
    loggedInAt: new Date(),
  });
```

The user should now be logged in if the credentials are correct. We can get the current user session in any API route or page by calling `getUserSession(event)`.

### 6. Create a logout API route
Users need to be able to log out, so we should create an API route to allow them to do this. This should be a post request as well, just like login. We'll clear the session and redirect the user to the home page.

```typescript [server/api/auth/logout.post.ts]
export default defineEventHandler(async (event) => {
  // Clear the current user session
  await clearUserSession(event);

  await sendRedirect(event, "/", 302);
});
```

### 7. Create a server utility function to protect routes
Protecting server routes is key to making sure your data are safe. We need to create a server utility function to protect our API routes with sensitive data. For these sensitive routes, we should return a 401 error if the user is not logged in.

Util functions are auto-imported. You can read about the `/server/util` folder [here](https://nuxt.com/docs/guide/directory-structure/utils). This utility function will help us prevent data from being accessed by users who are not logged in.

This function will be available in any server route by calling `requireUserLoggedIn(event)`.

```typescript [server/utils/requireUserLoggedIn.ts]
export default async (event) => {
  await requireUserSession(event);
};
```

### 8. Protect a route with the utility function
Now that we have the utility function to protect routes, we can use it in any API route to ensure that only logged-in users can access the route.

In the example below, we use the `requireUserLoggedIn` utility function to protect the `/api/users.get` route. This route will only be accessible to logged-in users.

```typescript [server/api/users.get.ts]
import getDatabase from "~/database/database";
import users from "~/database/schema/users";
import requireUserLoggedIn from "~/server/utils/requireUserLoggedIn";

export default defineEventHandler(async (event) => {
  await requireUserLoggedIn(event);

  const db = await getDatabase();
  // Send back the list of users
  const userList = await db.select({ name: users.name, id: users.id }).from(users).limit(10);

  return userList;
});
```


### 9. Create a front-end middleware to protect routes
Our data are safe with the back-end route in place, but without doing anything else, unauthenticated users would probably get some odd data when trying to access the `/users` page. We need to create a front-end middleware to protect the route on the client side and redirect users to a login page.

You can read more about front-end middleware [here](https://nuxt.com/docs/guide/directory-structure/middleware).

```typescript [middleware/RedirectIfNotAuthenticated.ts]
export default defineNuxtRouteMiddleware(() => {
  // check if the user is logged in
  const { loggedIn } = useUserSession();

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return navigateTo("/login");
  }

  return null;
});
```

### 10. Protect a route with the front-end middleware
Now that we have the front-end middleware to protect routes, we can use it in any page to ensure that only logged-in users can access the route. Users will be redirected to the login page if they are not authenticated.

We'll use `definePageMeta` to apply the middleware to the route. You can read more about `definePageMeta` [here](https://nuxt.com/docs/api/utils/define-page-meta).

```vue [pages/users/index.vue]
<script setup lang="ts">
const { data: users } = await useFetch("/api/users");

definePageMeta({
  middleware: ["redirect-if-not-authenticated"],
});
</script>

<template>
  <ContentWidthContainer>
    <div class="pb-4 text-sm font-semibold uppercase">Users List</div>

    <div>
      <ul class="space-y-4">
        <li v-for="user in users" :key="user.id">
          <NuxtLink :to="`/users/${user.id}`">
            <div class="px-4 py-2 hover:bg-gray-600">{{ user.name }}</div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </ContentWidthContainer>
</template>
```

### Complete!

We've successfully set up user registration and authentication in our Nuxt app. Users can now register, log in, and log out. We've also protected sensitive routes on the server and client side to ensure that only authenticated users can access them.
