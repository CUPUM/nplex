<script lang="ts" context="module">
	import type { Writable } from 'svelte/store';
	export interface SwitchSetContext {
		name: string;
		current: Writable<HTMLElement>;
	}
</script>

<script lang="ts">
	import { onDestroy, onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let name: string;
	export let variant: 'primary' | 'secondary' | 'nav' | 'ghost' = 'primary';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let orientation: 'vertical' | 'horizontal' = 'horizontal';

	let fieldset: HTMLFieldSetElement;
	let current: SwitchSetContext['current'] = writable(null);
	let style: string;
	let obs: ResizeObserver;

	setContext<SwitchSetContext>('switchset', {
		name,
		current,
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

<fieldset {...$$restProps} style:font-size="var(--size-{size})" class={variant} bind:this={fieldset}>
	<div id="indicator" {style} />
	<slot />
</fieldset>

<style>
	fieldset {
		position: relative;
		border: none;
		padding: 4px;
		display: inline-flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: center;
		gap: 0;
		height: 2.8em;
		border-radius: 1em;
		background-color: var(--color-light-300);
	}

	#indicator {
		position: absolute;
		background-color: var(--color-primary-100);
		transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
		border-radius: 0.85em;
	}
</style>
