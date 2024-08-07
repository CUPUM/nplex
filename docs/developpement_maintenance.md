# Développement & maintenance

## Installation locale

### Utiliser le _package manager_ prescrit

The project's monorepo expects you to use `pnpm` as the package manager to enable proper use of its
workspace features. Using `npm` is not indicated. This allows dependency optimizations with shared
and cached packages on developement or production devices. If you do not have `pnpm` installed,
please refer to: <https://pnpm.io/installation> or simply proceed with either:

```sh
# brew (preferred method)
brew install pnpm

# npm
npm install -g pnpm
```

### Définir les variables d'environnement requises

Before building or starting any service, make sure to define the required environment variables in a
`.env` file at the root of the repo. A reference [`.env.template`](.env.template) is provided to
help identify required variables. Any populated `.env` files are not included in commits, and never
should be, as they contain sensitive information for service authentications.

### Installation

Install the project with the usual command.

```sh
pnpm install
```

## Structure

### Application

SvelteKit (à documenter)

#### Services

- Vercel Free (à documenter)

### Base de données

Le projet est construit sur une base de données _Postgres_ gérée via des fichiers de migration qui
permettent de faire un suivi des modification de schéma.

Drizzle-kit has some trouble using the project's own tsconfig generated by SvelteKit, we thus
provide a helper to alias `drizzle-kit` scripts:

```sh
# Run a drizzle-kit related script using the proper ts config
pnpm db:run
```

This script is also used to provide further shorthands, such as:

```sh
# Generate a new migration
pnpm db:generate

# Apply migrations to the remote database
pnpm db:migrate
```

#### Services

- Neon.tech (à documenter)

### Stockage (media)

AWS (à documenter)

#### Services

- AWS (à documenter)
- Serverless Image Handler (à documenter)
