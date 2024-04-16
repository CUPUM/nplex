<!--
	@component
	A small tip svg shape. Useful to show where popoevers, tooltips, or other elements are anchored.
-->
<script lang="ts">
	import type { TooltipElements } from '@melt-ui/svelte';
	import type { FloatingConfig } from '@melt-ui/svelte/internal/actions';
	import type { StoresValues } from 'svelte/store';

	export let roundness = 20;
	export let size: number | string = '0.5em';
	export let positioning: FloatingConfig | undefined = undefined;
	export let arrow: StoresValues<TooltipElements['arrow']> | undefined = undefined;
	export let top: number | string | undefined = undefined;
	export let right: number | string | undefined = undefined;
	export let bottom: number | string | undefined = undefined;
	export let left: number | string | undefined = undefined;
	export let transform: string | undefined = undefined;

	$: d =
		`M 0,-0 C ${roundness},0 ` +
		`${50 - roundness},50 50,50 C ${50 + roundness},50 ` +
		`${100 - roundness},0 100,-0 Z`;

	$: arrowaction = arrow?.action ?? (() => {});
</script>

<svg
	class="tip {positioning ? positioning.placement : ''}"
	width={size}
	height={size}
	viewBox="25 0 75 50"
	preserveAspectRatio="xMinYMin slice"
	style:--size={typeof size === 'number' ? size + 'px' : size}
	{...arrow}
	use:arrowaction
	style:top
	style:right
	style:bottom
	style:left
	style:transform
>
	<path {d} />
</svg>

<style>
	.tip {
		pointer-events: none;
		user-select: none;
		position: absolute;
		padding: 0;
		margin: 0;
		background: transparent;
		overflow: visible;
	}

	path {
		fill: var(--tip-color, inherit);
	}

	.top,
	.top-start,
	.top-end {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
	}

	.right,
	.right-start,
	.right-end {
		right: 100%;
		top: 50%;
		transform: rotateZ(90deg) translateX(-50%);
	}

	.bottom,
	.bottom-start,
	.bottom-end {
		bottom: 100%;
		left: 50%;
		transform: rotateZ(180deg) translateX(50%);
	}

	.left,
	.left-start,
	.left-end {
		left: 100%;
		top: 50%;
		transform: rotateZ(-90deg) translateX(50%);
	}
</style>
