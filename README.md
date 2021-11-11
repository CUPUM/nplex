# Nplex (frontend)

## General

This project is scaffolded using [SvelteKit](https://kit.svelte.dev/), a compiler oriented Javascript framework. The targeted distribution environement is Nodejs, we are thus here using the ecosystem's [node adapter](https://kit.svelte.dev/docs#adapters).

## Getting started

### Setting things up

After cloning the repo, initialize the project and its dependencies locally:

```bash
#npm:
npm install
#or yarn:
yarn
```

### Developing

Once you've installed the dependencies, you can start a development server:

```bash
#npm:
npm run dev
# or yarn:
yarn dev

# append the optional "-- --open" flag to either of these commands if you want to automatically open the app in a new browser tab once the server has started
```

## Preparing a distribution

Since a Nodejs environement is required for SvelteKit's server-side-rendering (SSR), the project's `/dist` will be provided as a dockerized application wrapped with a minimal Nodejs-on-Linux-architecture image, thus reducing risks of discrepency problems between developement and production environments' node versions and other root dependencies.

### Building

To build the application:

```bash
npm run build
#or
yarn build
```

You can preview the built app with:

```bash
npm run preview
#or
yarn preview
```

...regardless of whether you installed an adapter or not.

Note that the `preview` command should _not_ be used to serve the app in production.

### Deployment

Mockups of the project will temporarily be deployed to Heroku until the CalculCanada server is properly set up.

### CI/CD pipeline within GitHub

_**To do**: set GitHub actions and/or necessary webhooks to link with deployement destination and update distribution builds

## Project details and dependencies

### SvelteKit

**To do**

### Postcss

**To do**
List each postcss plugin, state its use in the project, link to repo/docs.

### Docker/container

**To do**

### Mapping tools

**To do**