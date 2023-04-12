import { defineNuxtPlugin } from "#app";
import { createPinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
  console.log("Plugin injected by my-module!");

  // @note: install pinia
  nuxtApp.vueApp.use(createPinia());
});
