## Components organization

Components' files should be organized into three directories:

-   `/primitives` : For primitive-level components used across the app to compose more complex components, layouts, or pages.
-   `/complexes` : For reusable higher-order, more complex components used across multiple layouts / pages / components. Complex component compositions specific to a layout or page should be placed to its side, inside the route folder.

Avoid grouping components in subfolders and use clearly composed names (with prefixes, subfixes, etc.) to organize siblings or related components.
Components should be named in `PascalCase` and without punctuation apart from the extension.
