<script lang="ts">
	import { px } from '$lib/common/css';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '../utilities';

	let {
		class: className,
		color,
		size = 'var(--border-width-lg)',
		spacing = 40,
		...props
	}: {
		color?: string;
		size?: string | number;
		spacing?: string | number;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	role="presentation"
	class={cn('fill rounded-inherit dotted-background -z-1', className)}
	style:--size={px(size)}
	style:--spacing={px(spacing)}
	style:color
	{...props}
></div>

<style>
	.dotted-background {
		--half-size: calc(var(--size) / 2);
		--half-spacing: calc(var(--spacing) / 2);
		background-image: radial-gradient(currentColor var(--half-size), transparent 0);
		background-size: var(--spacing) var(--spacing);
		background-position: calc(-1 * var(--half-spacing) + var(--half-size))
			calc(-1 * var(--half-spacing) + var(--half-size));
	}
</style>
