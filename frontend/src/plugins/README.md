# Custom vite plugins

This folder contains the scripts used as in-house vite plugins to automate certain processes during builds and dev-server reloads.
Note that `svelte.config.vite` uses the transpiled `.js` versions found under `./dist`. Make sure to keep latest `.ts` versions in sync.

## Updating the plugins dist/\*.js

Run `pnpm plugins` to transpile the latest `.ts` versions into the `/dist` directory.
