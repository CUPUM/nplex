<script lang="ts">
	import { melt, type DialogElements, type DialogStates } from '@melt-ui/svelte';
	import { elasticOut, expoIn } from 'svelte/easing';
	import { fade, fly, scale } from 'svelte/transition';

	export let portalled: DialogElements['portalled'];
	export let overlay: DialogElements['overlay'];
	export let content: DialogElements['content'];
	export let title: DialogElements['title'];
	export let description: DialogElements['description'];
	export let open: DialogStates['open'];
</script>

<div use:melt={$portalled}>
	{#if $open}
		<div class="overlay" use:melt={$overlay} transition:fade={{ duration: 250 }} />
		<div class="content-wrap">
			<div
				class="content"
				use:melt={$content}
				in:scale={{ start: 0.8, duration: 500, easing: elasticOut }}
				out:fly={{ y: 6, duration: 150, easing: expoIn }}
			>
				Test
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 99;
		background-color: var(--color-neutral-200);
		opacity: 0.85;
		:global(:--dark) & {
			background-color: var(--color-neutral-950);
		}
	}

	.content-wrap {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		pointer-events: none;
		z-index: 99;
	}

	.content {
		pointer-events: initial;
		border-radius: var(--radius-lg);
		padding: 2rem;
		animation: extrude 1s ease-out forwards;
		background-color: var(--color-neutral-50);
		:global(:--dark) & {
			background-color: var(--color-neutral-900);
		}
	}

	@keyframes extrude {
		from {
			box-shadow: 0 0 0.5rem -1rem transparent;
		}
		to {
			box-shadow: var(--shadow-sm), var(--shadow-2xl);
		}
	}
</style>
