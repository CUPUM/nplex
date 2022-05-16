## Components organization

Components' files should be organized into three directories:

-   `/primitives` : For primitive-level components used across the app to compose more complex components, layouts, or routes.
-   `/complexes` : For reusable higher-order, more complex components used in `__layout`s or in routes to organize functionalites or how things are laid out.

Avoid grouping components in subfolders and use clearly composed names (with prefixes, subfixes, etc.) to organize siblings or related components.
Components should be named in `PascalCase` and without punctuation (apart from the extension).
