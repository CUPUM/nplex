<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DescriptorFormDialog from '$lib/components/patterns/descriptor-form-dialog.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm, type ExtendedSuperFormData } from '$lib/crud/form/client';
	import { Wrench, X } from 'lucide-svelte';
	import type { PageData } from './$types';

	let {
		projectExemplarityMarkersListForm,
		projectInterventionFormData,
	}: {
		projectExemplarityMarkersListForm: ExtendedSuperFormData<
			PageData['projectExemplarityMarkersListForm']
		>;
		projectInterventionFormData: PageData['projectExemplarityMarkerForms'][number];
	} = $props();

	const { formId: parentFormId, submitter: parentSubmitter } = projectExemplarityMarkersListForm;

	const projectInterventionForm = extendedSuperForm(projectInterventionFormData, {
		dataType: 'json',
		resetForm: false,
	});

	const { form, constraints } = projectInterventionForm;

	let deleteRef = $state<HTMLButtonElement>();
</script>

<DescriptorFormDialog form={projectInterventionForm} action="?/updateMarker">
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
				formaction="?/deleteIntervention"
				bind:this={deleteRef}
			>
				<IconSpinner icon={X} busy={$parentSubmitter === deleteRef} />
			</button>
		</div>
	{/snippet}
	{#snippet title()}
		{m.project_intervention()}
	{/snippet}
	{#snippet formBody()}
		<TranslationsTabs>
			{#snippet tab({ lang })}
				<label class="field">
					<span class="field-label">{m.title()}</span>
					<input
						type="text"
						class="input"
						{...$constraints.translations?.[lang]?.description}
						bind:value={$form.translations[lang].title}
					/>
				</label>
				<label class="field">
					<span class="field-label">{m.description()}</span>
					<textarea
						class="input"
						rows="5"
						{...$constraints.translations?.[lang]?.description}
						bind:value={$form.translations[lang].description}
					></textarea>
				</label>
			{/snippet}
		</TranslationsTabs>
	{/snippet}
</DescriptorFormDialog>
