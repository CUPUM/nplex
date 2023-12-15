<script context="module" lang="ts">
	export const dialogIn: TransitionFunction = (node) =>
		scale(node, { start: 0.9, duration: 100, easing: springOut });
	export const dialogOut: TransitionFunction = (node) =>
		transform(node, {
			translate: [0, 8, -200],
			rotate: [-15, 0, 0],
			duration: 100,
			easing: expoIn,
		});
	export const dialogOverlayTransition: TransitionFunction = (node) =>
		fade(node, { duration: 250 });
</script>

<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { springOut } from '$lib/easings/spring';
	import { transform } from '$lib/motion/transform';
	import type { TransitionFunction } from '$lib/utils/types';
	import { melt, type DialogElements, type DialogStates } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { expoIn } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';

	export let portalled: DialogElements['portalled'];
	export let overlay: DialogElements['overlay'];
	export let content: DialogElements['content'];
	export let title: DialogElements['title'];
	// export let description: DialogElements['description'];
	export let close: DialogElements['close'];
	export let open: DialogStates['open'];

	let _in: TransitionFunction = dialogIn;
	export { _in as in };

	export let out: TransitionFunction = dialogOut;
</script>

<div use:melt={$portalled}>
	{#if $open}
		<div class="dialog-overlay" use:melt={$overlay} transition:dialogOverlayTransition />
		<div class="dialog-wrap">
			<article class="dialog-content" use:melt={$content} in:_in out:out>
				<header>
					<hgroup use:melt={$title}>
						{#if $$slots.header}
							<slot name="header" />
						{/if}
					</hgroup>
					<menu>
						<button
							use:ripple
							class="button danger square rounded ghost"
							type="button"
							use:melt={$close}
						>
							<X class="button-icon" />
						</button>
					</menu>
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
	@import '$styles/scoped/dialog.css';
</style>
