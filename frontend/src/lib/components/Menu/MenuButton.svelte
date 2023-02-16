<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type E = $$Generic<keyof HTMLElementTagNameMap>;

	type $$Props = SvelteHTMLElements[E] & {
		element?: typeof element;
		variant?: typeof variant;
		active?: typeof active;
	};

	export let element: E | 'button' = 'button';
	export let variant: 'default' | 'ghost' | 'outlined' | 'cta' | 'danger' = 'default';
	export let active: boolean | undefined = undefined;

	// const {} = getMenuContext();
</script>

<svelte:element this={element} {...$$restProps} class="ui-menu-button {$$restProps.class}">
	<slot />
</svelte:element>

<style lang="scss">
	.ui-menu-button {
		padding: 1em;
		background: wheat;
	}
</style>
