<script lang="ts">
	import * as m from '$i18n/messages';
	import ButtonIconPencil from '$lib/components/ButtonIconPencil.svelte';
	import ButtonIconPlus from '$lib/components/ButtonIconPlus.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SuperForm } from '$lib/crud/validation/forms/super-form';
	import { melt, type DialogElements } from '@melt-ui/svelte';
	import { Trash2 } from 'lucide-svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';

	type $$Props = HTMLButtonAttributes & {
		i: number;
		trigger: DialogElements['trigger'];
		submitter: SuperForm['elements']['submitter']['root'];
		variant?: 'new' | 'pending';
		deleteButton?: HTMLButtonAttributes;
	};

	export let i: $$Props['i'];
	export let trigger: $$Props['trigger'];
	export let submitter: $$Props['submitter'];
	export let variant: $$Props['variant'] = undefined;
	export let deleteButton: $$Props['deleteButton'] = undefined;

	let deleteRef: HTMLButtonElement;
</script>

<section class="dashboard-subsection" in:fly|global={{ y: -6, opacity: 0, delay: i * 50 }}>
	{#if variant === 'new'}
		<button use:melt={$trigger} class="new">
			<div class="button dashed">
				<slot />
				<ButtonIconPlus />
			</div>
		</button>
	{:else}
		<header>
			<hgroup>
				<h2 class="h4" use:melt={$trigger}>
					<slot name="title" />
				</h2>
				<menu class="compact">
					<Tooltip let:trigger={tooltipTrigger}>
						<svelte:fragment slot="content">
							<LangKey>
								{m.edit()}
							</LangKey>
						</svelte:fragment>
						<button class="button outlined square" use:melt={$trigger} use:melt={tooltipTrigger}>
							<ButtonIconPencil />
						</button>
					</Tooltip>
					{#if deleteButton}
						<Tooltip let:trigger={tooltipTrigger}>
							<svelte:fragment slot="content">
								<LangKey>
									{m.del()}
								</LangKey>
							</svelte:fragment>
							<button
								{...deleteButton}
								type="submit"
								class="delete button outlined square danger"
								bind:this={deleteRef}
								use:melt={$submitter(deleteRef)}
								use:melt={tooltipTrigger}
							>
								<Trash2 />
							</button>
						</Tooltip>
					{/if}
				</menu>
			</hgroup>
			<section class="description" use:melt={$trigger}>
				<slot name="description" />
			</section>
		</header>
		<slot />
	{/if}
</section>

<style>
	@import '$styles/scoped/dashboard';

	.dashboard-subsection {
		display: flex;
		flex-direction: column;
	}

	header {
		padding: 1.5rem;
		margin: 1rem;
		margin-bottom: 0;
		line-height: var(--line-sparse);
		border-radius: calc(var(--dashboard-radius) - 1rem);
		border: var(--base-border-width) solid var(--base-border-color-dim);
		background: white;
		:global(:--dark) & {
			background: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
		}
	}

	[data-melt-dialog-trigger] {
		cursor: pointer;
	}

	.description {
		margin-top: 1rem;
		max-width: 65ch;
		opacity: var(--opacity-dim);
		font-size: var(--size-sm);
	}

	hgroup {
		display: flex;
		flex-direction: row;
		gap: 1em;
	}

	.new {
		grid-column: full;
		font-size: var(--size-sm);
		padding: 2rem;
	}

	menu {
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		gap: 3px;
	}
</style>
