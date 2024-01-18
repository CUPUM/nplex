<script lang="ts" context="module">
	import { page } from '$app/stores';

	export type CreateStateDialogProps = Omit<CreateDialogProps, 'open' | 'defaultOpen'> & {
		getOpen: <P extends Page>(page: P) => boolean;
	};

	/**
	 * INCOMPLETE.
	 */
	export function createStateDialog({
		getOpen,
		onOpenChange,
		...restProps
	}: CreateStateDialogProps) {
		const stateOpen = derived(page, ($p) => getOpen($p));
		const dialog = createDialog({
			...restProps,
			defaultOpen: get(stateOpen),
			onOpenChange: (e) => {
				const next = onOpenChange ? onOpenChange(e) : e.next;
				tick().then(() => {
					if (e.curr && !next && get(stateOpen)) {
						history.back();
					}
				});
				return next;
			},
		});
		stateOpen.subscribe((o) => {
			dialog.states.open.set(o);
		});
		return dialog;
	}
</script>

<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { springOut } from '$lib/easings/spring';
	import { transform } from '$lib/motion/transform';
	import {
		createDialog,
		melt,
		type CreateDialogProps,
		type DialogElements,
		type DialogStates,
	} from '@melt-ui/svelte';
	import type { Page } from '@sveltejs/kit';
	import { X } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { derived, get } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';

	export let portalled: DialogElements['portalled'];
	export let overlay: DialogElements['overlay'];
	export let content: DialogElements['content'];
	export let title: DialogElements['title'];
	export let description: DialogElements['description'];
	export let close: DialogElements['close'];
	export let open: DialogStates['open'];
	export let closeButton: boolean = true;
</script>

<div use:melt={$portalled}>
	{#if $open}
		<div
			class="dialog-overlay"
			use:melt={$overlay}
			in:fade={{ duration: 75 }}
			out:fade={{ duration: 150 }}
		/>
		<div class="dialog-wrap">
			<article
				class="dialog-content"
				use:melt={$content}
				in:fly={{ y: 6, duration: 300, easing: springOut }}
				out:transform={{
					translate: [0, 12, -100],
					rotate: [-20, 0, 0],
					duration: 100,
					easing: cubicOut,
				}}
			>
				<header class="dialog-header">
					<hgroup class="dialog-title" use:melt={$title}>
						{#if $$slots.title}
							<h1 class="h4">
								<slot name="title" />
							</h1>
						{/if}
						<menu class="dialog-header-menu">
							{#if closeButton}
								<button
									use:ripple
									class="button rounded square danger ghost"
									type="button"
									use:melt={$close}
								>
									<X />
								</button>
							{/if}
						</menu>
					</hgroup>
					{#if $$slots.description}
						<div class="dialog-description" use:melt={$description}>
							<slot name="description" />
						</div>
					{/if}
				</header>
				<slot>Content</slot>
				{#if $$slots.footer}
					<footer class="dialog-footer">
						<slot name="footer" />
					</footer>
				{/if}
			</article>
		</div>
	{/if}
</div>

<style lang="postcss">
	@use '../misc.css';

	.dialog-overlay {
		--dialog-overlay-bg: radial-gradient(
			circle,
			color-mix(in srgb, var(--color-neutral-200) 95%, transparent) 25%,
			color-mix(in srgb, var(--color-neutral-50) 80%, transparent) 100%
		);
		position: fixed;
		inset: 0;
		z-index: 99;
		background: var(--dialog-overlay-bg);
		backdrop-filter: blur(1px);

		:global(:--dark) & {
			--dialog-overlay-bg: radial-gradient(
				circle,
				color-mix(in srgb, var(--color-neutral-950) 90%, transparent) 25%,
				color-mix(in srgb, var(--base-bg) 90%, transparent) 120%
			);
		}
	}

	.dialog-wrap {
		--dialog-radius: var(--radius-xl);
		--dialog-bg: var(--color-neutral-50);
		--dialog-padding: 2.5rem;
		perspective: 900px;
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-end;
		pointer-events: none;
		z-index: 99;

		:global(:--dark) & {
			--dialog-bg: var(--color-neutral-900);
		}

		@media (--md) {
			align-items: center;
			padding: var(--navbar-height);
			justify-content: center;
		}
	}

	.dialog-content {
		position: relative;
		transform-origin: bottom center;
		outline: none;
		pointer-events: initial;
		padding: var(--dialog-padding);
		padding-top: calc(var(--dialog-padding) - 0.5rem);
		display: flex;
		flex-direction: column;
		border-radius: var(--dialog-radius) var(--dialog-radius) 0 0;
		/* border: var(--base-border-width) solid var(--base-border-color-dim); */
		overflow-y: auto;
		max-width: 100%;
		background-color: var(--dialog-bg);

		@media (--md) {
			transform-origin: center center;
			border-radius: var(--dialog-radius);
		}
	}

	.dialog-header {
		display: flex;
		flex-direction: column;
		gap: calc(1em * var(--line-sparse));
		margin-bottom: var(--dialog-padding);

		.dialog-title {
			display: flex;
			flex-direction: row;
			gap: 2em;
			position: relative;
			justify-content: space-between;
		}

		.dialog-description {
			opacity: var(--opacity-dim);
		}

		.dialog-header-menu {
			@mixin compact;
			display: flex;
			flex-direction: row;
			gap: var(--base-gutter);
			font-size: var(--size-sm);
		}
	}

	.dialog-footer {
		position: relative;
		font-size: var(--size-sm);
		margin-top: var(--dialog-padding);
	}
</style>
