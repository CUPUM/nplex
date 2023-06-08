# Theme vite plugin

Vite plugin to generate theming utilities usable both in scss and js.

## Setup

Default theming values are provided, but customization is also possible. Simply provide a
`themes.config.js` file in the root of your project, alongside your `vite.config.ts`.

```js
// themes.config.js

/**
 * @type {import('workspace:themes').Config}
 */
const config = {
  // ...
};

export default config;
```

## Usage

### Scss

The plugin also comes with a collection of sass utility functions:

```scss
.classname {
  color: col(primary, 500, 0.5);
}
```

### Javascript
