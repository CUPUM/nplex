## Components organization

Components' files should be organized into three directories:

-   `/primitives` : For primitive-level components used across the app to compose more complex components, layouts, or pages.
-   `/complexes` : For reusable higher-order, more complex components used across multiple layouts / pages / components. Complex component compositions specific to a layout or page should be placed to its side, inside the route folder.

Avoid grouping components in subfolders and use clearly composed names (with prefixes, subfixes, etc.) to organize siblings or related components.
Components should be named in `PascalCase` and without punctuation apart from the extension.

### Coupled public/private properties for reactive contexts

Some primitive components should provide certain context properties with reactivity. This implies passing stores to ensure a proper component-private (context-scoped) reactive communication with children. For this to work, the concerned component's exported properties have to be two-way bound with privately kept stores. For consistency, the indicated approach is as follows:

```html
<!--  -->
<script lang="ts">
	export let value: any = null;

	const initialValue = value;

	let _value = writable(value);
	$: $_value = value;
</script>

<!-- Use a granular two-way binding where -->
<input />
```
