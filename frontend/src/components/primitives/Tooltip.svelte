<script lang="ts">
	import { cssSize, type CssSizeValue } from '$utils/helpers/css';
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let message: string;
	export let open: boolean = false;
	export let placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';
	export let align: 'start' | 'center' | 'end' | 'stretch' = 'center';
	export let distance: number | CssSizeValue = 5;
	export let warning: boolean = undefined;
	export let success: boolean = undefined;
	export let variant: 'default' | 'secondary' | 'misc' = 'default';

	let controlRef: HTMLElement;
	let tooltipRef: HTMLElement;
	let mutationObs: MutationObserver;
	let resizeObs: ResizeObserver;
	let y;
	let x;
	let w;
	let h;
	let autoAlign;
	let autoPlacement;
	let timer;

	$: if (controlRef) {
		controlRef.addEventListener('mouseenter', () => console.log('entered!'));
	}

	function detach() {}

	onMount(() => {
		/** Referencing the previous sibling (to be passed in slot) as the control element. */
		controlRef = tooltipRef.previousElementSibling as HTMLElement;
		/** Initializing the position. */
		// to do.
	});
</script>

<slot name="control" />
<div
	bind:this={tooltipRef}
	class:success
	class:warning
	class="{variant} {placement} {align}"
	style:--distance={cssSize(distance)}
>
	{#if open}
		<slot />
	{/if}
</div>

<style>
	div {
		background-color: red;
	}
</style>
