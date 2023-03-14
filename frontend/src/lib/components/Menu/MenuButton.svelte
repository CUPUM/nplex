<!--
	@component
	# Menu Button
	__To do__
-->
<script lang="ts">
	import { STATES, VARIANTS, type State, type Variant } from '$utils/enums';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = (HTMLButtonAttributes | HTMLAnchorAttributes) & {
		href?: string;
		variant?: Variant;
		state?: State;
		disabled?: boolean;
		active?: boolean;
		autoActive?: boolean;
	};

	export let href: $$Props['href'] = undefined;
	export let variant: $$Props['variant'] = VARIANTS.Default;
	export let state: $$Props['state'] = STATES.Normal;
	export let disabled: $$Props['disabled'] = undefined;
	export let active: $$Props['active'] = undefined;
	export let autoActive: $$Props['autoActive'] = true;

	let tag: 'a' | 'button';
	$: tag = href ? 'a' : 'button';

	$: computedActive = autoActive ? true : active;
</script>

<svelte:element
	this={tag}
	{disabled}
	class="menu-button {variant} {state}"
	{href}
	class:disabled
	class:active={autoActive}
>
	<slot />
</svelte:element>

<style lang="scss">
	.menu-button {
		--border-color: transparent;
		--border-style: solid;
		--color: currentColor
		--background-color: transparent;
	}
</style>
