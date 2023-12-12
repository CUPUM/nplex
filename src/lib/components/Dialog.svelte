<script context="module" lang="ts">
	type Transition = (node: HTMLElement) => TransitionConfig;
</script>

<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { springOut } from '$lib/easings/spring';
	import { transform } from '$lib/motion/transform';
	import { melt, type DialogElements, type DialogStates } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fade, scale, type TransitionConfig } from 'svelte/transition';

	export let portalled: DialogElements['portalled'];
	export let overlay: DialogElements['overlay'];
	export let content: DialogElements['content'];
	export let title: DialogElements['title'];
	// export let description: DialogElements['description'];
	export let close: DialogElements['close'];
	export let open: DialogStates['open'];

	let _in: Transition = (node) => scale(node, { start: 0.8, duration: 150, easing: springOut });
	export { _in as in };

	export let out: Transition = (node) =>
		transform(node, {
			translate: [0, 8, -200],
			rotate: [-15, 0, 0],
			duration: 125,
			easing: expoOut,
		});
</script>

<div use:melt={$portalled}>
	{#if $open}
		<div class="dialog-overlay" use:melt={$overlay} transition:fade={{ duration: 250 }} />
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
</style>
