<script lang="ts" context="module">
	export const SHAPES = ['round', 'arch', 'square', 'rectangle'];

	type Shape = (typeof SHAPES)[number];

	function pickRandomShape() {
		return SHAPES[Math.floor(Math.random() * SHAPES.length)] as Shape;
	}
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		shape = $bindable(pickRandomShape()),
		class: className,
		...restProps
	}: {
		shape?: Shape;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-shape={shape}
	class={cn(
		'flex-none rounded-sm data-[shape=square]:aspect-square data-[shape=round]:aspect-square data-[shape=round]:rounded-full data-[shape=arch]:aspect-square data-[shape=arch]:rounded-t-full data-[shape=rectangle]:aspect-1/2',
		className
	)}
	{...restProps}
></div>
