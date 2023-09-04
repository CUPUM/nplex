<script lang="ts">
	import { getDistances, getTransformOrigin } from '$lib/utils/positioning';
	import {
		melt,
		type TooltipElements,
		type TooltipOptions,
		type TooltipStates,
	} from '@melt-ui/svelte';
	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import Tip from './Tip.svelte';

	export let open: TooltipStates['open'];
	export let content: TooltipElements['content'];
	export let positioning: TooltipOptions['positioning'];
</script>

{#if $open}
	<div
		class="content"
		use:melt={$content}
		style:transform-origin={getTransformOrigin($positioning)}
		in:fly={{ ...getDistances($positioning, -4), easing: cubicOut, duration: 100 }}
		out:scale={{ start: 0.8, duration: 50 }}
	>
		<Tip {positioning} />
		<slot />
	</div>
{/if}

<style lang="scss">
	.content {
		--tip-color: color-mix(in srgb, var(--color-neutral-800) 90%, transparent);
		font-weight: 400;
		font-size: var(--size-xs);
		letter-spacing: 0.02em;
		padding: var(--space-xs);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-lg);
		color: var(--color-neutral-200);
		background-color: var(--tip-color);

		@include dark {
			--tip-color: color-mix(in srgb, var(--color-neutral-950) 90%, transparent);
			color: var(--color-neutral-300);
		}
	}
</style>
