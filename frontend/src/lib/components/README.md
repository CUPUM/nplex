## Components organization

Components' files should be organized into three directories:

- `/primitives` : For primitive-level components used across the app to compose more complex components, layouts, or
  pages.
- `/complexes` : For reusable higher-order, more complex components used across multiple layouts / pages / components.
  Complex component compositions specific to a layout or page should be placed to its side, inside the route folder.

Avoid grouping components in subfolders and use clearly composed names (with prefixes, subfixes, etc.) to organize
siblings or related components. Components should be named in `PascalCase` and without punctuation apart from the
extension.

## Archetype

Primitive components should strive to implement behaviors and props consistently. Here is a model outlining how various
common features of such components should be setup:

```html
<!--
	@component
	## Name
	Description
-->
<script lang="ts" context="module">
  const CTX_KEY = 'component-name-context';

  interface ComponentNameContext {
    value: Writable<string>;
    ...
  }

  export function getComponentNameContext() {
    return getContext(CTX_KEY);
  }
</script>

<script lang="ts">
  import { getContext } from 'svelte';
  import { forwardEvents } from '$utils/forwardEvents';

  export let someProp: string | undefined = undefined;
  export let value: string = '';
  let className: string = '';
  export { className as class };
  export let style: string | undefined = undefined;

  let ref: HTMLElement;

  /**
   * Forward all on:* directives without having to manually declare them on the ref element. This reduces template
   * clutter but results in loss of proper intellisens on component invokers (no on:... auto-completion).
   */

  forwardEvents(() => ref);

  /**
   * Some components should provide certain reactive properties through their context. This implies passing stores to
   * ensure a proper coupling of public/private properties for reactive context accessible to children. For this to work
   * without requiring devs to pass a store, the concerned component's exported properties have to be two-way bound with
   * privately kept stores. For consistency, the indicated approach is as follows:
   */

  const _value = writable(value);
  $: value = $_value;
  $: _value.set(value);

  function handleInput(e: InputEvent) {
    // Apply any formatting function here or in an on:change handler.
    value = (e.target as HTMLInputElement).value;
  }

  /**
   * Setting a context when needed.
   */

  setContext<ComponentNameContext>(CTX_KEY, {});
</script>

<input bind:this="{ref}" type="text" class="component-name {className}" {style} {value} on:input="{handleInput}" />

<style lang="scss">
  .component-name {
  }
</style>
```
