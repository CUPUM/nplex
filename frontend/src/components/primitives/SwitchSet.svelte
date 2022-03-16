<script lang="ts" context="module">
	import { writable, type Writable } from 'svelte/store';
	export interface SwitchSetContext {
		name: string;
		variant: string;
		size: string;
		current: Writable<HTMLElement>;
	}
</script>

<script lang="ts">
	import { onDestroy, onMount, setContext } from 'svelte';

	export let name: string;
	export let variant: 'primary' | 'secondary' | 'nav' | 'ghost' = 'primary';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let orientation: 'vertical' | 'horizontal' = 'horizontal';

	let fieldset: HTMLFieldSetElement;
	let current: SwitchSetContext['current'] = writable(null);
	let style: string;

	// function setStyle() {
	// 	if ($current) {
	// 		style = `top: ${$current.offsetTop}px; left: ${$current.offsetLeft}px; width: ${$current.offsetWidth}px; height: ${$current.offsetHeight}px;`;
	// 	}
	// }

	// $: setStyle(), $current;

	// onMount(() => {
	// 	setStyle();
	// });

	setContext<SwitchSetContext>('switchset', {
		name,
		variant,
		size,
		current,
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
		padding: 0;
		display: inline-flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: center;
		gap: 0;
		height: 3em;
	}

	#indicator {
		position: absolute;
		background-color: white;
		transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
		border-radius: 1em;
	}
</style>
