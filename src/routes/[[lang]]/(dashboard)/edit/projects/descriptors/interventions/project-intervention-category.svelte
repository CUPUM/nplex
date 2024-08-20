<script lang="ts">
	import * as m from '$i18n/messages';
	import { languageTag } from '$i18n/runtime';
	import { DialogForm } from '$lib/builders/dialog-form.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import DialogFormBox from '$lib/components/patterns/dialog-form-box.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { extendedSuperForm, type ExtendedSuperFormData } from '$lib/crud/form/client';
	import { Pen, TriangleAlert } from 'lucide-svelte';
	import type { PageData } from './$types';
	import ProjectInterventionCreate from './project-intervention-create.svelte';
	import ProjectIntervention from './project-intervention.svelte';

	let {
		projectTypes,
		data,
		projectInterventionCategoriesForm,
		projectInterventionCreateForm,
		projectInterventionForms,
		projectInterventionsForm,
	}: {
		data: PageData['projectInterventionAndCategoryForms'][number][0];
		projectInterventionCategoriesForm: ExtendedSuperFormData<
			PageData['projectInterventionsCategoriesForm']
		>;
		projectInterventionsForm: ExtendedSuperFormData<PageData['projectInterventionsForm']>;
		projectInterventionCreateForm: PageData['projectInterventionAndCategoryForms'][number][1];
	} & Pick<PageData, 'projectTypes' | 'projectInterventionForms'> = $props();

	const categoryForm = extendedSuperForm(data, {
		dataType: 'json',
		invalidateAll: true,
		resetForm: false,
	});

	const { form, constraints } = categoryForm;

	const {
		formId: parentFormId,
		submitter: parentFormSubmitter,
		form: parentForm,
	} = projectInterventionCategoriesForm;

	let deleteRef = $state<HTMLButtonElement>();

	const dialog = new DialogForm(categoryForm);
</script>

<DashboardSubSection>
	{#snippet header()}
		<h4>
			<button
				{...dialog.triggerAttributes}
				class="aria-[expanded=true]:text-primary gap-input-gap group/button duration-fast hover:text-primary flex cursor-pointer flex-row items-center font-semibold transition-all"
			>
				{$form.translations[languageTag()].title}
				<div class="button compact aspect-square rounded-full text-sm"><Pen /></div>
			</button>
		</h4>
	{/snippet}
	<ul class="gap-gap flex flex-row flex-wrap">
		{#each projectInterventionForms as projectInterventionFormData, i (projectInterventionFormData.id)}
			<li>
				<ProjectIntervention {projectInterventionFormData} {projectInterventionsForm} />
			</li>
		{/each}
		<li><ProjectInterventionCreate data={projectInterventionCreateForm} {projectTypes} /></li>
	</ul>
</DashboardSubSection>

<DialogFormBox {dialog} action="?/updateCategory">
	{#snippet title()}
		{m.project_intervention_category()}
	{/snippet}
	<TranslationsTabs>
		{#snippet tab({ lang })}
			<Field>
				{#snippet label()}
					{m.title()}
				{/snippet}
				<input
					type="text"
					bind:value={$form.translations[lang].title}
					{...$constraints.translations?.[lang]?.title}
					class="input"
				/>
			</Field>
			<Field>
				{#snippet label()}
					{m.description()}
				{/snippet}
				<textarea
					rows="5"
					bind:value={$form.translations[lang].description}
					{...$constraints.translations?.[lang]?.description}
					class="input"
				></textarea>
			</Field>
		{/snippet}
	</TranslationsTabs>
	<hr />
	<button
		class="button button-dashed self-start"
		data-danger
		form={$parentFormId}
		value={$form.id}
		formaction="?/deleteCategory"
		name="delete"
		bind:this={deleteRef}
	>
		<IconSpinner icon={TriangleAlert} busy={$parentFormSubmitter === deleteRef} />
		{m.del()}
	</button>
</DialogFormBox>
