<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DescriptorFormDialog from '$lib/components/patterns/descriptor-form-dialog.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm, type ExtendedSuperFormData } from '$lib/crud/form/client';
	import { Wrench, X } from 'lucide-svelte';
	import type { PageData } from './$types';

	let {
		projectTypesForm,
		projectTypeFormData,
	}: {
		projectTypesForm: ExtendedSuperFormData<PageData['projectTypesForm']>;
		projectTypeFormData: PageData['projectTypeForms'][number];
	} = $props();

	const { formId: parentFormId, submitter: parentSubmitter } = projectTypesForm;

	const projectTypeForm = extendedSuperForm(projectTypeFormData, {
		dataType: 'json',
		resetForm: false,
	});

	const { form, constraints } = projectTypeForm;

	let deleteRef = $state<HTMLButtonElement>();
</script>

<DescriptorFormDialog form={projectTypeForm} action="?/update">
	{#snippet root(triggerAttributes)}
		<div class="button nest pr-input-nest rounded-full" use:ripple>
			<button class="fill" type="button" {...triggerAttributes}></button>
			<Wrench />
			{$form.translations[$page.data.lang].title}
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
		</div>
	{/snippet}
	{#snippet title()}
		{m.project_type()}
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
</DescriptorFormDialog>
