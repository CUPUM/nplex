<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import LangKey from '$lib/components/LangKey.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SuperForm } from '$lib/forms/super-form';
	import { melt, type DialogElements } from '@melt-ui/svelte';
	import { Pencil, Plus, Trash2 } from 'lucide-svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type $$Props = HTMLButtonAttributes & {
		deleteButton?: HTMLButtonAttributes;
		variant?: 'new' | 'pending';
		trigger: DialogElements['trigger'];
		submitter: SuperForm['elements']['submitter']['root'];
		label?: string | null;
	};

	export let variant: $$Props['variant'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let trigger: $$Props['trigger'];
	export let submitter: $$Props['submitter'];
	export let deleteButton: $$Props['deleteButton'] = undefined;

	let deleteRef: HTMLButtonElement;
</script>

<div class="descriptor {variant ?? ''}">
	<button
		class="fill-parent"
		type="button"
		use:ripple
		{...$$restProps}
		use:melt={$trigger}
	></button>
	<span class="descriptor-label">
		{#if variant === 'new'}
			<LangKey>{m.create()}</LangKey>
			<Plus />
		{:else}
			{#if label}
				{label}
			{:else}
				<span class="dim">{m.no_title()}</span>
			{/if}
			<Pencil />
		{/if}
	</span>
	{#if deleteButton}
		<Tooltip let:trigger={tooltipTrigger}>
			<svelte:fragment slot="content">
				<LangKey>{m.del()}</LangKey>
			</svelte:fragment>
			<button
				{...deleteButton}
				class="descriptor-delete"
				bind:this={deleteRef}
				use:melt={tooltipTrigger}
				use:melt={$submitter(deleteRef)}
			>
				<Trash2 />
			</button>
		</Tooltip>
	{/if}
</div>

<style lang="postcss">
	@keyframes -global-descriptor-wiggle {
		0% {
			rotate: 0deg;
		}
		10% {
			rotate: 25deg;
		}
		25% {
			rotate: -15deg;
		}
		50% {
			rotate: 5deg;
		}
		100% {
			rotate: 0deg;
		}
	}

	.descriptor {
		--descriptor-nesting: var(--base-nesting);
		--descriptor-radius: var(--radius-full);
		position: relative;
		display: flex;
		font-weight: 450;
		flex-direction: row;
		align-items: center;
		padding: var(--descriptor-nesting);
		border-radius: var(--descriptor-radius);
		background: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		flex: none;
		height: 3em;
		border: var(--base-border-width) solid var(--base-border-color-dim);
		transition: all var(--duration-fast) ease-out;

		:global(:--icon) {
			pointer-events: none;
			opacity: var(--opacity-dimmer);
			width: 1em;
			stroke-width: 2.2;
			transition: all var(--duration-fast) ease-out;
		}

		:global(:--icon.lucide-plus),
		:global(:--icon.lucide-x) {
			width: 1.1;
			opacity: var(--opacity-dim);
			transform: rotate(0deg);
		}

		:global(:--icon.lucide-pencil) {
			transform-origin: 40% 60%;
		}

		&:hover {
			color: var(--color-neutral-900);
			background: color-mix(in srgb, var(--color-neutral-500) 20%, transparent);

			:global(:--dark) & {
				color: var(--color-neutral-100);
			}

			:global(:--icon.lucide-pencil) {
				opacity: 1;
				animation: descriptor-wiggle 1s ease-out;
			}

			:global(.lucide-icon.lucide-plus) {
				opacity: 1;
				transform: rotate(90deg);
			}
		}

		&.new {
			font-weight: 400;
			border-style: dashed;
			background: transparent;

			&:hover {
				border-color: transparent;
				background: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
			}
		}
	}

	.descriptor-label {
		pointer-events: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
		flex: 1;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding-inline: 0.9em;

		span.dim {
			font-style: italic;
			font-weight: 400;
		}
	}

	.descriptor-delete {
		position: relative;
		z-index: 1;
		aspect-ratio: 1;
		height: 100%;
		border-radius: calc(var(--descriptor-radius) - var(--descriptor-nesting));
		background: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		flex: none;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			color: var(--color-error-900);
			background: color-mix(in srgb, var(--color-error-500) 20%, transparent);

			:global(:--dark) & {
				color: var(--color-error-100);
				background: color-mix(in srgb, var(--color-error-700) 20%, transparent);
			}
		}

		&[data-loading] {
			color: var(--color-error-700);
			background: color-mix(in srgb, var(--color-error-500) 10%, transparent);

			:global(:--dark) & {
				color: var(--color-error-300);
				background: color-mix(in srgb, var(--color-error-700) 10%, transparent);
			}
		}
	}
</style>
