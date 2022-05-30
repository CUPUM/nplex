<script lang="ts" context="module">
	import { Ctx } from '$utils/contexts';
	import { cssSize, type CSSSizeValue } from '$utils/helpers/css';
	import { onDestroy, onMount, setContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	export interface SwitchContext {
		name: string;
		current: Writable<HTMLElement>;
		temp: Writable<HTMLElement>;
		variant: 'default' | 'secondary' | 'nav' | 'ghost' | 'cta';
		orientation: 'column' | 'row';
	}
</script>

<script lang="ts">
	export let name: string;
	export let variant: SwitchContext['variant'] = 'default';
	export let size: number | CSSSizeValue = '1em';
	export let orientation: SwitchContext['orientation'] = 'row';

	let fieldset: HTMLFieldSetElement;
	let obs: ResizeObserver;
	/** Corresponds to the label element of the currently selected input. */
	let current: SwitchContext['current'] = writable(null);
	let currentBox: string;
	/** Corresponds to the currently hovered label. */
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
				width: ${el.offsetWidth - 1}px;`;
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
>
	{#if currentBox}
		<div
			id="current"
			transition:scale={{ duration: 150, start: 0.8, opacity: 0 }}
			class:temp={Boolean($temp)}
			style={currentBox}
		/>
	{/if}
	<slot />
</fieldset>

<style lang="postcss">
	fieldset {
		--inset: 1px;
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
		overflow: visible;
		transition: all 0.25s ease-out;
	}

	#current {
		z-index: 1;
		position: absolute;
		height: var(--itemsize);
		border-radius: calc(1em - var(--inset));
		transition: all 0.2s cubic-bezier(0.8, 0, 0.2, 1.1), box-shadow 0.25s ease-in-out;
	}

	/* Variants */

	/* Default theme */
	.default {
		background-color: var(--color-light-500);
		&:hover,
		&:focus {
			background-color: var(--color-light-300);
		}
		& #current {
			background-color: var(--color-dark-500);
			/* box-shadow: 0 0.25em 1em -0.5em rgba(0, 0, 30, 0.2); */
			&.temp {
				background-color: var(--color-light-900);
				/* box-shadow: 0 0 0 1px rgba(0, 0, 30, 0.5); */
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
