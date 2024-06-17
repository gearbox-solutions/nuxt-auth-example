# Nuxt + Drizzle Auth Demo

This is very basic example implementation of using [Nuxt Auth Utils](https://github.com/Atinux/nuxt-auth-utils) to perform authentication. This example includes, registration, login, logout, and route protection to prevent unauthorized users from accessing specific content and routes. The home page is public, while the user list and detail pages requires that users be logged in to see the content.

This example uses Drizzle as a database ORM to store user information in a database.

Register a new user, then log in to see the user list and details.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install

```

## Configure .env

Copy `.env.example` to `.env` and configure the environment variables.


## Run Migrations
    
Run the Drizzle migrations:

```bash
pnpm drizzle-run-migrations
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```
