# Nuxt 3 + Drizzle Auth Demo

This is very basic demo of using Nuxt 3 with Drizzle as a database to register and authenticate users. The home page is public, while the user list and detail pages requires authentication.

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
