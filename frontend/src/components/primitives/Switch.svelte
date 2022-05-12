<script lang="ts" context="module">
	import type { Writable } from 'svelte/store';
	export interface SwitchContext {
		name: string;
		current: Writable<HTMLElement>;
		temp: Writable<HTMLElement>;
		variant: 'default' | 'secondary' | 'nav' | 'ghost' | 'cta';
		orientation: 'column' | 'row';
	}
</script>

<script lang="ts">
	import { onDestroy, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { cssSize, type CssSizeValue } from '$utils/helpers/css';
	import { Ctx } from '$utils/contexts';
	import { fade } from 'svelte/transition';
	import { ripple } from '$actions/ripple';

	export let name: string;
	export let variant: SwitchContext['variant'] = 'default';
	export let size: number | CssSizeValue = '1em';
	export let orientation: SwitchContext['orientation'] = 'row';

	let fieldset: HTMLFieldSetElement;
	let obs: ResizeObserver;
	/**
	 * Corresponds to the label element of the currently selected input.
	 */
	let current: SwitchContext['current'] = writable(null);
	let currentBox: string;
	/**
	 * Corresponds to the currently hovered label.
	 */
	let temp: SwitchContext['temp'] = writable(null);

	setContext<SwitchContext>(Ctx.Switch, {
		name,
		current,
		variant,
		temp,
		orientation,
	});

	function getBox(el: HTMLElement) {
		if (el) {
			// const rect = el.getBoundingClientRect();
			return `
				top: ${el.offsetTop}px;
				left: ${el.offsetLeft}px;
				width: ${el.offsetWidth}px;`;
		}
		return null;
	}

	$: currentBox = getBox($current);
	$: if ($temp) {
		currentBox = getBox($temp);
	} else {
		currentBox = getBox($current);
	}

	onMount(() => {
		obs = new ResizeObserver(() => {
			currentBox = getBox($current);
		});
		obs.observe(fieldset);
	});

	onDestroy(() => {
		obs?.unobserve(fieldset);
		obs?.disconnect();
	});
</script>

<fieldset
	bind:this={fieldset}
	class="{variant} {orientation}"
	style:font-size={cssSize(size)}
	style:flex-direction={orientation}
	use:ripple={{}}
>
	{#if currentBox}
		<div id="current" transition:fade={{ duration: 150 }} class:temp={!!$temp} style={currentBox} />
	{/if}
	<slot />
</fieldset>

<style lang="postcss">
	fieldset {
		--inset: 3px;
		--size: 2.8em;
		--itemsize: calc(var(--size) - 2 * var(--inset));
		position: relative;
		border: none;
		display: inline-flex;
		align-items: stretch;
		justify-content: center;
		gap: 0;
		padding: var(--inset);
		border-radius: 1em;
		transition: all 0.25s ease-out;
	}

	#current {
		z-index: 1;
		position: absolute;
		transition: all 0.2s cubic-bezier(0.75, 0, 0.25, 1.15);
		height: var(--itemsize);
		border-radius: calc(1em - var(--inset));
	}

	/* Variants */

	/* Default theme */
	.default {
		background-color: var(--color-light-700);
		&:hover,
		&:focus {
			background-color: var(--color-light-300);
		}
		& #current {
			background-color: var(--color-light-100);
			box-shadow: 0 0.25em 1em -0.5em rgba(0, 0, 30, 0.2);
			&.temp {
				/* box-shadow: inset 0 0 0 1px var(--color-light-100); */
				box-shadow: 0 0 0 0 transparent;
				background-color: white;
			}
		}
	}

	/* Secondary theme */
	.secondary {
	}

	/* Ghost theme */
	.ghost {
	}

	/* Nav theme */
	.nav {
	}

	/* Cta theme */
	.cta {
	}
</style>
