<script lang="ts" generics="T extends Record<string, unknown>">
	import * as m from '$i18n/messages';
	import { DialogForm } from '$lib/builders/dialog-form.svelte';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import type { ExtendedSuperForm } from '$lib/crud/form/client';
	import { Check, X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import IconSpinner from './icon-spinner.svelte';

	let {
		token,
		title,
		description,
		body,
		tainted,
		isTainted,
		form,
		submitter,
	}: ExtendedSuperForm<T> & {
		token: Snippet<[InstanceType<typeof DialogForm>['triggerAttributes']]>;
		title?: Snippet;
		description?: Snippet;
		body: Snippet;
	} = $props();

	let submitRef = $state<HTMLButtonElement>();

	const dialog = new Dialog({
		beforeClose(e) {
			if (isTainted()) {
				return confirm(m.confirm_unsaved_data());
			}
			return true;
		},
	});
</script>

{@render token(dialog.triggerAttributes)}
{#if dialog.open}
	<dialog
		class="dialog min-w-sm"
		transition:scale={{ start: 0.95, duration: 350, easing: expoOut }}
		use:dialog.dialogAction
		{...dialog.dialogAttributes}
	>
		{#if title}
			<header class="dialog-title">
				{@render title()}
				<button class="button button-ghost dialog-close compact aspect-square rounded-full">
					<X />
				</button>
			</header>
			<hr />
		{/if}
		<div class="dialog-body">
			{@render body()}
		</div>
		<hr />
		<menu class="dialog-actions">
			<button bind:this={submitRef} class="button button-cta" disabled={!isTainted($tainted)}>
				<IconSpinner icon={Check} busy={submitRef === $submitter} />{m.save()}
			</button>
			<button class="button button-ghost" {...dialog.closeAttributes}><X />{m.close()}</button>
		</menu>
	</dialog>
{/if}
