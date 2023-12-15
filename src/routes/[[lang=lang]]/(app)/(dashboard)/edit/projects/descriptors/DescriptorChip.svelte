<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { Pencil, Plus, X } from 'lucide-svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type $$Props = HTMLAnchorAttributes &
		(
			| {
					create?: boolean;
					deleteAction?: undefined;
					deleteValue?: undefined;
			  }
			| {
					create?: undefined;
					deleteAction: string;
					deleteValue: string;
			  }
			| {
					create?: undefined;
					deleteAction?: undefined;
					deleteValue?: undefined;
			  }
		);

	export let create: $$Props['create'] = false;
	export let deleteAction: $$Props['deleteAction'] = undefined;
	export let deleteValue: $$Props['deleteValue'] = undefined;

	let submitterRef: HTMLElement | null;
	let deleteRef: HTMLButtonElement;
</script>

{#if create}
	<!-- svelte-ignore a11y-missing-content -->
	<a {...$$restProps} class="descriptor create" data-sveltekit-noscroll>
		<span class="descriptor-label">
			<LangKey>{m.create()}</LangKey>
			<Plus />
		</span>
	</a>
{:else}
	<form
		method="POST"
		class="descriptor"
		use:enhance={({ submitter }) => {
			submitterRef = submitter;
			return ({ result }) => {
				submitterRef = null;
			};
		}}
	>
		<!-- svelte-ignore a11y-missing-content -->
		<a {...$$restProps} class="fill-parent" data-sveltekit-noscroll></a>
		<span class="descriptor-label">
			<slot />
		</span>
		<Pencil />
		{#if deleteAction}
			<button
				class="descriptor-delete"
				type="submit"
				formaction={deleteAction}
				bind:this={deleteRef}
				class:loading={(submitterRef = deleteRef)}
			>
				<X />
			</button>
		{/if}
	</form>
{/if}

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
		font-weight: 500;
		flex-direction: row;
		align-items: center;
		padding: var(--descriptor-nesting);
		border-radius: var(--descriptor-radius);
		background: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		flex: none;
		height: 3em;
		gap: 3px;
		border: var(--base-border-width) solid var(--base-border-color-dim);
		transition: all var(--duration-fast) ease-out;

		:global(:--icon) {
			opacity: 0.5;
			width: 1.1em;
			stroke-width: 2.25;
			transition: all var(--duration-fast) ease-out;
		}

		:global(:--icon.lucide-plus) {
			transform: rotate(0deg);
		}

		:global(:--icon.lucide-pencil) {
			transform-origin: 40% 60%;
			margin-right: 0.75em;
		}

		&:hover:not(:has(button:hover)) {
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

		&.create {
			font-weight: 300;
			border-style: dashed;
			background: transparent;

			&:hover {
				border-color: transparent;
				background: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
			}
		}
	}

	.descriptor-label {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5em;
		flex: 1;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding-inline: 1em;
	}

	.descriptor-delete {
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
	}
</style>
