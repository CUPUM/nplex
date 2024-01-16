<script lang="ts">
	import { getDistances, getTransformOrigin } from '$lib/utils/positioning';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import type { FloatingConfig } from '@melt-ui/svelte/internal/actions';
	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import Tip from './Tip.svelte';

	export let placement: NonNullable<FloatingConfig>['placement'] = 'top';
	export let disabled = false;
	export let closeOnPointerDown = false;

	const {
		elements: { trigger, content, arrow },
		options: { positioning },
		states: { open },
	} = createTooltip({
		positioning: {
			placement,
			gutter: 10,
		},
		openDelay: 150,
		closeDelay: 0,
		forceVisible: true,
		closeOnPointerDown,
	});
</script>

<slot trigger={$trigger} />

{#if $open && !disabled}
	<div
		use:melt={$content}
		class="tooltip-content"
		style:transform-origin={getTransformOrigin($positioning)}
		in:fly={{ ...getDistances($positioning, -4), easing: cubicOut, duration: 100 }}
		out:scale={{ start: 0.8, duration: 100 }}
	>
		<Tip positioning={$positioning} arrow={$arrow} />
		<slot name="content" />
	</div>
{/if}

<style lang="postcss">
	.tooltip-content {
		--tip-color: color-mix(in srgb, var(--color-neutral-800) 95%, transparent);
		font-weight: 400;
		font-size: var(--size-xs);
		letter-spacing: 0.02em;
		padding: 0.75rem;
		border-radius: var(--radius-sm);
		/* box-shadow: var(--shadow-lg); */
		color: var(--color-neutral-200);
		background-color: var(--tip-color);
		backdrop-filter: blur(8px);
		z-index: 9999;

		:global(:--dark) & {
			--tip-color: color-mix(in srgb, var(--color-neutral-950) 95%, transparent);
			color: var(--color-neutral-300);
		}
	}
</style>
