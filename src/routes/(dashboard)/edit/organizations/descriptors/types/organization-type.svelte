<script lang="ts">
	import * as m from '$i18n/messages';
	import { languageTag } from '$i18n/runtime';
	import { DialogForm } from '$lib/builders/dialog-form.svelte';
	import DescriptorFormToken from '$lib/components/patterns/descriptor-form-token.svelte';
	import DialogFormBox from '$lib/components/patterns/dialog-form-box.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm, type ExtendedSuperFormData } from '$lib/crud/form/client';
	import { X } from 'lucide-svelte';
	import type { PageData } from './$types';

	let {
		organizationTypesForm,
		organizationTypeFormData,
	}: {
		organizationTypesForm: ExtendedSuperFormData<PageData['organizationTypesForm']>;
		organizationTypeFormData: PageData['organizationTypeForms'][number];
	} = $props();

	const { formId: parentFormId, submitter: parentSubmitter } = organizationTypesForm;

	const typeForm = extendedSuperForm(organizationTypeFormData, {
		dataType: 'json',
		resetForm: false,
	});

	const { form, constraints } = typeForm;

	let deleteRef = $state<HTMLButtonElement>();

	const dialog = new DialogForm(typeForm);
</script>

<DescriptorFormToken {dialog}>
	{$form.translations[languageTag()].title}
	<button
		class="button button-ghost aspect-square rounded-full"
		data-danger
		use:ripple
		form={$parentFormId}
		value={$form.id}
		name="delete"
		formaction="?/delete"
		bind:this={deleteRef}
		onclick={(e) => {
			if (!confirm(m.type_delete_confirm())) {
				e.preventDefault();
			}
		}}
	>
		<IconSpinner icon={X} busy={$parentSubmitter === deleteRef} />
	</button>
</DescriptorFormToken>

<DialogFormBox {dialog} action="?/update">
	{#snippet title()}
		{m.organization_type()}
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
					{...$constraints.translations?.[lang]?.description}
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
