<script lang="ts" context="module">
	import type { Writable } from 'svelte/store';
	export interface SwitchContext {
		name: string;
		current: Writable<HTMLElement>;
		temp: Writable<HTMLElement>;
		variant: 'primary' | 'secondary' | 'nav' | 'ghost';
	}
</script>

<script lang="ts">
	import { onDestroy, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { cssSize, type CssSizeValue } from '$utils/helpers/css';
	import { Ctx } from '$utils/contexts';

	export let name: string;
	export let variant: SwitchContext['variant'] = 'primary';
	export let size: number | CssSizeValue = '1em';
	export let orientation: 'column' | 'row' = 'row';

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
	let tempBox: string;

	setContext<SwitchContext>(Ctx.Switch, {
		name,
		current,
		variant,
		temp,
	});

	function setStyle() {
		if ($current) {
			currentBox = `top: ${$current.offsetTop}px; left: ${$current.offsetLeft}px; width: ${$current.offsetWidth}px; height: ${$current.offsetHeight}px;`;
		}
	}

	$: $current, setStyle();

	onMount(() => {
		obs = new ResizeObserver(setStyle);
		obs.observe(fieldset);
	});

	onDestroy(() => {});
</script>

<fieldset {...$$restProps} style:font-size={cssSize(size)} class="{variant} {orientation}" bind:this={fieldset}>
	<div id="indicator" style={currentBox} />
	<slot />
</fieldset>

<style lang="postcss">
	fieldset {
		position: relative;
		border: none;
		padding: 0;
		display: inline-flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: center;
		gap: 0;
		height: 2.8em;
		border-radius: 1em;
		background-color: var(--color-light-500);
		transition: all 0.3s ease-out;

		&:hover {
			/* box-shadow: 0 0.25em 1.5em -1em var(--color-dark-100); */
		}
	}

	#indicator {
		position: absolute;
		background-color: var(--color-primary-300);
		transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
		border-radius: 0.85em;
	}

	/* Variants */
</style>
