// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    database: {
      host: process.env.DB_HOST ?? "127.0.0.1", // can be set with DB_HOST environment variable at build time or overwritten at runtime with NUXT_DB_HOST
      port: process.env.DB_PORT ?? 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  },
  vite: {
    build: {
      target: "esnext",
    },
  },
});
