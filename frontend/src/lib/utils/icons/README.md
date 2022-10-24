# Icons

## Guidelines

The icons' declaration is generated from the svg files placed in the root of this directory. SVG definitions should abide by certain rules to ensure proper generation of [`icons.ts`](icons.ts):

-   Path attributes should define only one of `stroke` or `fill`

-   Secondary paths should be specified using the attribute `type=secondary`. The script will default to `type=primary` wherever this attribute is not specified inside the svg.

-   The `<svg>...</svg>` tag should also define the `height`, `width`, and `viewBox` attributes.

## Generating the icon set

The [generator script](../../../scripts/ICONS.ts) is executed automatically on build and listen's to changes in it or this directory when the dev server is running.
