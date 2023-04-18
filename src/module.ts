import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImportsDir,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@kikikk/web3-modules",
    configKey: "@kikikk/web3-modules",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup() {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));

    // @note: import hooks
    addImportsDir(resolver.resolve("./runtime/composables"));
    // @note: import stores
    addImportsDir(resolver.resolve("./runtime/stores"));
    // @note: import constants
    addImportsDir(resolver.resolve("./runtime/constants"));
  },
  hooks: {
    // @note: import components
    "components:dirs"(dirs) {
      const resolver = createResolver(import.meta.url);
      dirs.push({
        path: resolver.resolve(__dirname, "./runtime/components"),
      });
    },
  },
});
