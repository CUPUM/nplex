<script lang="ts" context="module">
	import { Ctx } from '$utils/contexts';
	import { cssSize, type SizeInput } from '$utils/helpers/css';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';

	export interface SwitchContext {
		name: string;
		currentRef: Writable<HTMLElement>;
		tempRef: Writable<HTMLElement>;
		variant: 'default' | 'secondary' | 'navbar' | 'ghost' | 'cta';
		orientation: 'column' | 'row';
	}
</script>

<script lang="ts">
	export let name: string;
	export let size: SizeInput = '1em';
	export let variant: SwitchContext['variant'] = 'default';
	export let orientation: SwitchContext['orientation'] = 'row';

	let fieldset: HTMLFieldSetElement;
	let obs: ResizeObserver;
	/** Corresponds to the label element of the currently selected input. */
	let current: SwitchContext['currentRef'] = writable(null);
	let currentBox: string;
	/** Corresponds to the currently hovered label. */
	let temp: SwitchContext['tempRef'] = writable(null);

	setContext<SwitchContext>(Ctx.Switch, {
		name,
		currentRef: current,
		variant,
		tempRef: temp,
		orientation,
	});

	function getBox(el: HTMLElement) {
		if (el) {
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
>
	{#if currentBox}
		<div
			id="current"
			transition:scale={{ duration: 150, start: 0.8, opacity: 0, easing: expoOut }}
			class:temp={Boolean($temp)}
			style={currentBox}
		/>
	{/if}
	<slot />
</fieldset>

<style lang="postcss">
	fieldset {
		--inset: 0px;
		position: relative;
		border: none;
		display: inline-flex;
		align-items: stretch;
		justify-content: center;
		gap: 0;
		padding: var(--inset);
		border-radius: var(--base-radius);
		overflow: visible;
		transition: all 0.25s ease-out;
	}

	#current {
		z-index: 1;
		position: absolute;
		height: calc(var(--base-size) - 2 * var(--inset));
		border-radius: calc(var(--base-radius) - var(--inset));
		transition: all 0.15s cubic-bezier(0.8, 0, 0.2, 1.2);
	}

	/* Variants */

	/* Default theme */
	.default {
		background-color: var(--color-light-500);
		&:hover {
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
	.navbar {
		--outset: 0px;
		--bg: var(--color-light-300);
		background-color: var(--bg);
		box-shadow: 0 0 0 var(--outset) var(--bg);
		&:hover,
		&:focus {
			/* --bg: white; */
			/* box-shadow: 0 0 0 var(--outset) var(--bg), 0 0.5em 1.5em -0.5em rgba(var(--rgb-dark-900), 0.2); */
		}
		& #current {
			background-color: var(--color-dark-700);

			&.temp {
				opacity: 0.1;
			}
		}
	}

	/* Cta theme */
	.cta {
	}
</style>
