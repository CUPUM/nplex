<script lang="ts" context="module">
	import { defineContext } from '$lib/utils/context';
	import { defineChildIndexContext } from '$lib/utils/index-context';
	import { onDestroy } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { getSidebarIndex } from './Sidebar.svelte';

	const [getGroupIndex, setGroupIndex] = defineChildIndexContext({});
	const [getGroupDelay, setGroupDelay] = defineContext<number>({});

	export { getGroupDelay, getGroupIndex };
</script>

<script lang="ts">
	const indexCtx = getSidebarIndex();
	setGroupIndex();
	const index = indexCtx?.add() ?? 0;

	const delay = index * 150;
	setGroupDelay(delay);

	onDestroy(() => {
		indexCtx?.remove();
	});
</script>

<section in:scale={{ start: 0.95, duration: 750, easing: expoOut, delay }}>
	{#if $$slots.heading}
		<h2>
			<slot name="heading" />
		</h2>
	{/if}
	<div class="items">
		<slot />
	</div>
</section>

<style lang="postcss">
	section {
		--_sidebar-needle-right: -0.5rem;
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-lg);
		background-color: var(--sidebar-bg);
		padding: 0.5rem;
		margin-bottom: 0;
	}

	h2 {
		position: relative;
		left: 0;
		padding: 0.75rem 1rem;
		font-size: var(--size-xs);
		font-weight: 350;
		letter-spacing: 0.01em;
		line-height: 1.5;
		color: var(--color-neutral-500);
		:global(:--dark) & {
		}
	}

	.items {
		display: flex;
		flex-direction: column;
	}
</style>
