<script lang="ts" generics="T extends Record<string, unknown>">
	import * as m from '$i18n/messages';
	import { DialogForm } from '$lib/builders/dialog-form.svelte';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import type { ExtendedSuperForm } from '$lib/crud/form/client';
	import { Check, X } from 'lucide-svelte';
	import type { ComponentProps, Snippet } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import DialogBox from '../primitives/dialog-box.svelte';
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
	}: Pick<HTMLFormAttributes, 'action' | 'method'> &
		Pick<ComponentProps<DialogBox>, 'title' | 'description'> & {
			form: ExtendedSuperForm<T>;
			root: Snippet<[InstanceType<typeof DialogForm>['triggerAttributes']]>;
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
<DialogBox {dialog} class="min-w-sm" {title}>
	<form id={$formId} {...formAttributes} use:enhance {method} class="gap-card-gutter flex flex-col">
		{@render formBody()}
	</form>
	{#if body}
		<hr />
		{@render body(dialog)}
	{/if}
	{#snippet actions()}
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
	{/snippet}
</DialogBox>
