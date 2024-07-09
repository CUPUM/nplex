<script lang="ts" generics="T extends Record<string, unknown>, M">
	import * as m from '$i18n/messages';
	import type { DialogForm } from '$lib/builders/dialog-form.svelte';
	import { Check, X } from 'lucide-svelte';
	import type { ComponentProps } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import DialogBox from '../primitives/dialog-box.svelte';
	import IconSpinner from './icon-spinner.svelte';

	let {
		title,
		description,
		children,
		method = 'POST',
		dialog,
		...formAttributes
	}: Pick<HTMLFormAttributes, 'action' | 'method'> &
		Pick<ComponentProps<DialogBox>, 'title' | 'description' | 'children'> & {
			dialog: DialogForm<T, M>;
		} = $props();

	const { isTainted, enhance, tainted, reset, formId, submitter } = dialog.form;

	let submitRef = $state<HTMLButtonElement>();
</script>

<DialogBox {dialog} class="min-w-sm" {title} {description}>
	<form id={$formId} {...formAttributes} use:enhance {method} class="gap-gap flex flex-col">
		{@render children?.(dialog)}
	</form>
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
