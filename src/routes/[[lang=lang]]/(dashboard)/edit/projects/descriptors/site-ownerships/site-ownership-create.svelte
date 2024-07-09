<script lang="ts">
	import * as m from '$i18n/messages';
	import { DialogForm } from '$lib/builders/dialog-form.svelte';
	import DialogFormBox from '$lib/components/patterns/dialog-form-box.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm, type ExtendedSuperFormData } from '$lib/crud/form/client';
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';

	let {
		data,
		listForm,
	}: {
		data: PageData['createForm'];
		listForm: ExtendedSuperFormData<PageData['listForm']>;
	} = $props();

	const { formId: parentFormId, submitter: parentSubmitter } = listForm;

	const createForm = extendedSuperForm(data, {
		dataType: 'json',
		resetForm: false,
		taintedMessage: true,
	});

	const { form, constraints, enhance, formId } = createForm;

	const dialog = new DialogForm(createForm);
</script>

<button
	class="button button-dashed rounded-full"
	type="button"
	{...dialog.triggerAttributes}
	use:ripple
>
	<Plus />
	{m.create()}
</button>

<DialogFormBox {dialog} action="?/create">
	{#snippet title()}
		{m.project_create_ownership_type()}
	{/snippet}
	<TranslationsTabs>
		{#snippet tab({ lang })}
			<Field>
				{#snippet label()}
					{m.title()}
				{/snippet}
				<input
					type="text"
					class="input"
					{...$constraints.translations?.[lang]?.title}
					bind:value={$form.translations[lang].title}
				/>
			</Field>
			<Field>
				{#snippet label()}
					{m.description()}
				{/snippet}
				<textarea
					class="input"
					rows="5"
					{...$constraints.translations?.[lang]?.description}
					bind:value={$form.translations[lang].description}
				></textarea>
			</Field>
		{/snippet}
	</TranslationsTabs>
</DialogFormBox>
