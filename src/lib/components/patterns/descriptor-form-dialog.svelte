<script lang="ts" generics="T extends Record<string, unknown>">
	import * as m from '$i18n/messages';
	import { DialogForm } from '$lib/builders/dialog-form.svelte';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import type { ExtendedSuperForm } from '$lib/crud/form/client';
	import { Check, X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';
	import IconSpinner from './icon-spinner.svelte';

	let {
		root,
		title,
		description,
		formBody,
		body,
		form,
		method = 'POST',
		...formAttributes
	}: Pick<HTMLFormAttributes, 'action' | 'method'> & {
		form: ExtendedSuperForm<T>;
		root: Snippet<[InstanceType<typeof DialogForm>['triggerAttributes']]>;
		title?: Snippet;
		description?: Snippet;
		formBody: Snippet;
		body?: Snippet<[Dialog]>;
	} = $props();

	const { isTainted, enhance, tainted, reset, formId, submitter } = form;

	let submitRef = $state<HTMLButtonElement>();

	const dialog = new Dialog({
		beforeClose(e) {
			if (isTainted()) {
				return confirm(m.confirm_unsaved_data());
			}
			return true;
		},
		onClose(e) {
			if (isTainted()) {
				reset();
			}
		},
	});
</script>

{@render root(dialog.triggerAttributes)}
{#if dialog.open}
	<dialog
		class="dialog min-w-sm"
		transition:scale={{ start: 0.95, duration: 350, easing: expoOut }}
		use:dialog.dialogAction
		{...dialog.dialogAttributes}
	>
		{#if title}
			<header class="dialog-title">
				<button
					tabindex="0"
					class="button button-ghost compact aspect-square rounded-full"
					{...dialog.closeAttributes}
					data-danger={isTainted($tainted) || undefined}
				>
					<X />
				</button>
				{@render title()}
			</header>
			<hr />
		{/if}
		<form
			id={$formId}
			{...formAttributes}
			use:enhance
			{method}
			class="dialog-body gap-card-gutter flex flex-col"
		>
			{@render formBody()}
		</form>
		{#if body}
			<hr />
			<section class="dialog-body">
				{@render body(dialog)}
			</section>
		{/if}
		<hr />
		<menu class="dialog-actions">
			<button
				bind:this={submitRef}
				class="button button-cta"
				disabled={!isTainted($tainted)}
				form={$formId}
				type="submit"
			>
				<IconSpinner icon={Check} busy={submitRef === $submitter} />{m.save()}
			</button>
			<button
				class="button button-ghost"
				{...dialog.closeAttributes}
				data-danger={isTainted($tainted) || undefined}
			>
				<X />{m.close()}
			</button>
		</menu>
	</dialog>
{/if}
