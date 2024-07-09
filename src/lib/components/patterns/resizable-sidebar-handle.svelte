<script lang="ts">
	import { rem } from '$lib/common/css';
	import { SeparatorVertical } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';
	import { ripple } from '../primitives/ripple.svelte';

	let {
		sidebar,
		min = 'var(--width-2xs)',
		max = 'var(--width-sm)',
		width = $bindable<number>(),
	}: {
		sidebar: Snippet<[sidebar: typeof action, css?: string]>;
		min?: string | number;
		max?: string | number;
		width?: number;
	} = $props();

	let origin = $state<{ x: number; width: number }>();
	let sidebarRef = $state<HTMLElement>();
	let css = $derived(width ? `min(clamp(${min},${rem(width)},${max}),100%)` : undefined);

	function action(element: HTMLElement) {
		sidebarRef = element;
		return {
			destroy() {
				sidebarRef = undefined;
			},
		};
	}

	function start(e: PointerEvent) {
		if (sidebarRef) {
			origin = {
				x: e.pageX,
				width: sidebarRef.offsetWidth,
			};
		}
	}

	function end() {
		origin = undefined;
	}

	function move(e: PointerEvent) {
		if (origin) {
			const delta = e.pageX - origin.x;
			width = origin.width + delta;
		}
	}
</script>

<svelte:window onpointermove={move} onpointercancel={end} onpointerup={end} onpointerleave={end} />

{@render sidebar(action, css)}
<button
	transition:slide={{ axis: 'x' }}
	onpointerdown={start}
	class="z-front group/handle w-gap top-sticky-top h-main-full-height relative relative sticky flex flex-none cursor-ew-resize flex-row items-center justify-center"
>
	<hr
		class="group-hover/handle:bg-input group-active/handle:bg-input-accent absolute h-full w-[var(--border-width-md)] self-stretch rounded-full border-none transition-all"
	/>
	<div
		use:ripple
		class="text-input/soft group-active/handle:text-input-accent group-hover/handle:text-input-accent group-active/handle:bg-base group-hover/handle:bg-base opacity-softer p-padding absolute relative flex aspect-square items-center justify-center rounded-full text-sm transition-all group-hover/handle:opacity-100 group-active/handle:opacity-100"
	>
		<SeparatorVertical class="stroke-lg" />
	</div>
</button>
