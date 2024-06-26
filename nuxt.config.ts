// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-auth-utils", "@pinia/nuxt"],
  runtimeConfig: {
    database: {
      host: process.env.DB_HOST ?? "127.0.0.1", // can be set with DB_HOST environment variable at build time or overwritten at runtime with NUXT_DB_HOST
      port: parseInt(process.env.DB_PORT ?? "3306", 10),
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
