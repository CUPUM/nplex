import { dev } from '$app/environment';

/**
 * Until kit provides its own way of accessing the app build's version, we can get it using vite's global var replacer.
 * For app version to update in dev without having to manually restart the server, simply resave vite.config.ts.
 *
 * Stay up to date with: https://github.com/sveltejs/kit/issues/7144.
 */
export const version = dev ? __VITE_DEV_APP_VERSION__ : __SVELTEKIT_APP_VERSION__;
