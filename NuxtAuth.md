# User Registration and Authentication with Nuxt.js

## Introduction
User registration and authentication is an extremely common requirement in web apps. This recipe will show you how to implement basic user registration and authentication in you Nuxt app.

In this recipe we'll be using [Drizzle](https://orm.drizzle.team/) with [db0](https://db0.unjs.io/) for database queries, but you can use any ORM or database connection strategy you prefer.

You'll need a `users` table in your database with the following columns:
- `id` (int, primary key, auto increment)
- `email` (varchar)
- `password` (varchar)

## Steps
