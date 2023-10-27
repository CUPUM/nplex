<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { springOut } from '$lib/easings/spring';
	import { transform } from '$lib/transitions/transform';
	import { melt, type DialogElements, type DialogStates } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fade, scale, type TransitionConfig } from 'svelte/transition';

	export let portalled: DialogElements['portalled'];
	export let close: DialogElements['close'];
	export let overlay: DialogElements['overlay'];
	export let content: DialogElements['content'];
	export let title: DialogElements['title'];
	export let description: DialogElements['description'];
	export let open: DialogStates['open'];
	let _in: (node: HTMLElement) => TransitionConfig = (node) =>
		scale(node, { start: 0.8, duration: 150, easing: springOut });
	export { _in as in };
	export let out: (node: HTMLElement) => TransitionConfig = (node) =>
		transform(node, {
			translate: [0, 8, -200],
			rotate: [-15, 0, 0],
			duration: 125,
			easing: expoOut,
		});
</script>

<div use:melt={$portalled}>
	{#if $open}
		<div class="overlay" use:melt={$overlay} transition:fade={{ duration: 250 }} />
		<div class="content-wrap">
			<article class="content" use:melt={$content} in:_in out:out>
				<header>
					<hgroup class="heading md" use:melt={$title}>
						{#if $$slots.header}
							<slot name="header" />
						{/if}
					</hgroup>
					<button
						use:ripple
						class="button danger round ghost compact"
						type="button"
						use:melt={$close}
					>
						<X class="button-icon" />
					</button>
				</header>
				<slot>Content</slot>
				{#if $$slots.footer || $$slots.actions}
					<footer>
						<slot name="footer" />
						{#if $$slots.actions}
							<menu>
								<slot name="actions" />
							</menu>
						{/if}
					</footer>
				{/if}
			</article>
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
		perspective: 900px;
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-end;
		pointer-events: none;
		z-index: 99;

		@media (--md) {
			align-items: center;
			padding: 2rem;
			justify-content: center;
		}
	}

	.content {
		--dialog-radius: var(--radius-xl);
		position: relative;
		transform-origin: bottom center;
		outline: none;
		pointer-events: initial;
		padding: 1.5rem;
		border-radius: var(--dialog-radius) var(--dialog-radius) 0 0;
		animation: extrude 1s ease-out forwards;
		overflow-y: auto;
		max-width: 100%;
		background-color: var(--color-neutral-50);
		:global(:--dark) & {
			background-color: var(--color-neutral-900);
		}

		@media (--md) {
			transform-origin: center center;
			border-radius: var(--dialog-radius);
			justify-content: center;
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

	header {
		display: flex;
		flex-direction: row;
		gap: 1em;
		position: relative;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
		justify-content: space-between;

		button {
			font-size: var(--size-xs);
		}

		hgroup {
			margin-left: 0.5em;
		}
	}

	footer {
		position: relative;
		font-size: var(--size-sm);
		margin-top: 1rem;
		padding-top: 1rem;
	}
</style>
