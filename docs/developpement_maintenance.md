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

Nplex est construit avec SvelteKit.

#### Services

##### Vercel

L'application est hébergée sur un forfait gratuit (_freemium_) de [Vercel](https://vercel.com/). Si
vous souhaitez changer de service d'hébergement, assurez-vous d'ajuster la
[configuration de Svelte](../svelte.config.js) avec l'adaptateur adéquat.

### Base de données

Le projet est construit sur une base de données _Postgres_. Toute conception ou modification au
niveau de la structure des données est à gérer via le schéma [`drizzle`](https://orm.drizzle.team/)
puis par la génération de fichiers de migration. Ce fonctionnement permet de faire un suivi des
ajustements et assure une correspondance entre l'état du schéma de la base de données et les types
de données fournis par l'ORM utilisé au niveau du code applicatif.

#### Gestion des schémas

Le pont entre le schéma déclaré dans le code applicatif et tout outillage supplémentaire est rendu
possible par [`drizzle-kit`](https://orm.drizzle.team/kit-docs/overview).

Les scripts de base de `drizzle-kit` n'arrivent cependant pas à utiliser la configuration typescript
du projet SvelteKit, vous devez donc utiliser un script qui s'assure de configurer adéquatement
typescript lors des actions de `drizzle-kit`:

```sh
# Exécuter des scripts drizzle-kit en utilisant la configuration typescript adéquate
pnpm db:run

# Ex.:
# pnpm db:run migrate
```

En nous appuyant sur ce script, nous fournissons aussi quelques raccourcis pour des actions
fréquentes telles que:

```sh
# Générer une nouvelle migration
pnpm db:generate

# Appliquer les migrations sur la base de données
pnpm db:migrate
```

#### Services

##### Neon

La base de données, tant en production qu'en développement, est hébergé sur le service
[Neon](https://neon.tech/).

> [!NOTE]
>
> Si vous souhaitez changer de service pour l'hébergement de la base de données, assurez-vous de
> mettre à jour [l'adaptateur du module de base de données](../src/lib/db/db.server.ts) qui assure
> la connexion de l'application au service en question.

### Stockage (media)

La gestion du contenu médiatique dynamique est opérée via deux services complémentaires. Un stockage
S3 sur Amazon Web Services (AWS) et une distribution via le _Serverless Image Handler_ de AWS
permettant une optimization sur-demande des images.

#### Services

#### AWS S3

Toutes données plus lourdes rendues disponible via Nplex devraient être entreposées sur
[AWS S3](https://aws.amazon.com/fr/s3/). Les images sont normalement téléversées dans leur état
original (pleine résolution, compression minimale, etc.) afin de permettre des ajustement sur mesure
définis au cas par cas via les requêtes de l'application.

#### Serverless Image Handler

De manière générale, les images hébergées sur AWS S3 et affichées à travers l'interface graphique de
Nplex doivent être accédées via l'API du traiteur d'images
([_Serverless Image Handler_](https://aws.amazon.com/solutions/implementations/serverless-image-handler/)).
