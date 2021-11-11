# Nplex (frontend)

## General

Nplex's frontend application is scaffolded using [SvelteKit](https://kit.svelte.dev/), a compiler oriented Javascript framework. The targeted distribution environement is Nodejs, thus we are here using the _Svelte_ ecosystem's [node adapter](https://kit.svelte.dev/docs#adapters).

## Getting started

### Setting things up

After cloning the repo, initialize the project and its dependencies locally:

```bash
npm install
#or
yarn
```

### Developing

Once you've installed the dependencies, you can start a development server:

```bash
npm run dev
#or
yarn dev

# append the optional "-- --open" flag to either of these commands if you want
# to automatically open the app in a new browser tab once the server has started
```

## Preparing a distribution

In the long run, the project's `/dist` build should be provided as a dockerized application wrapped with a minimal Nodejs-on-Linux-architecture image to reduce risks of discrepency problems between developement and production environments' node versions and other root dependencies. The said docker image will also contain the proper vscode configurations and extensions to facilitate/predefine setup of a dev container.

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
