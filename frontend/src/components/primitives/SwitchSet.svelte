<script lang="ts" context="module">
	import type { Writable } from 'svelte/store';
	export interface SwitchSetContext {
		name: string;
		current: Writable<HTMLElement>;
		variant: 'primary' | 'secondary' | 'nav' | 'ghost';
	}
</script>

<script lang="ts">
	import { onDestroy, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let name: string;
	export let variant: SwitchSetContext['variant'] = 'primary';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let orientation: 'vertical' | 'horizontal' = 'horizontal';

	let fieldset: HTMLFieldSetElement;
	let current: SwitchSetContext['current'] = writable(null);
	let style: string;
	let obs: ResizeObserver;

	setContext<SwitchSetContext>('switchset', {
		name,
		current,
		variant,
	});

	function setStyle() {
		if ($current) {
			style = `top: ${$current.offsetTop}px; left: ${$current.offsetLeft}px; width: ${$current.offsetWidth}px; height: ${$current.offsetHeight}px;`;
		}
	}

	$: $current, setStyle();

	onMount(() => {
		obs = new ResizeObserver(setStyle);
		obs.observe(fieldset);
	});

	onDestroy(() => {});
</script>

<fieldset {...$$restProps} style:font-size="var(--size-{size})" class="{variant} {orientation}" bind:this={fieldset}>
	<div id="indicator" {style} />
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
