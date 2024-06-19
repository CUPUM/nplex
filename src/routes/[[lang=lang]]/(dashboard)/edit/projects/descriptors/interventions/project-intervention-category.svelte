<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DescriptorFormDialog from '$lib/components/patterns/descriptor-form-dialog.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import { extendedSuperForm, type ExtendedSuperFormData } from '$lib/crud/form/client';
	import { TriangleAlert, Wrench } from 'lucide-svelte';
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

	const projectInterventionCategoryForm = extendedSuperForm(data, { dataType: 'json' });
	const { form, constraints } = projectInterventionCategoryForm;
	const { formId: parentFormId, submitter: parentFormSubmitter } =
		projectInterventionCategoriesForm;

	let deleteRef = $state<HTMLButtonElement>();
</script>

<section class="dashboard-section">
	<DescriptorFormDialog form={projectInterventionCategoryForm} action="?/updateCategory">
		{#snippet root(triggerAttributes)}
			<header class="dashboard-section-title">
				<button
					{...triggerAttributes}
					class="aria-[expanded=true]:text-primary gap-input-gutter text-md group/button duration-fast hover:text-primary flex cursor-pointer flex-row items-center font-semibold transition-all"
				>
					{$form.translations[$page.data.lang].title}
					<div class="button compact aspect-square rounded-full text-sm"><Wrench /></div>
				</button>
			</header>
		{/snippet}
		{#snippet title()}
			{m.project_intervention_category()}
		{/snippet}
		{#snippet formBody()}
			<TranslationsTabs>
				{#snippet tab({ lang })}
					<label class="field">
						<span class="field-label">{m.title()}</span>
						<input
							type="text"
							bind:value={$form.translations[lang].title}
							{...$constraints.translations?.[lang]?.title}
							class="input"
						/>
					</label>
					<label class="field">
						<span class="field-label">{m.title()}</span>
						<textarea
							rows="5"
							bind:value={$form.translations[lang].description}
							{...$constraints.translations?.[lang]?.description}
							class="input"
						></textarea>
					</label>
				{/snippet}
			</TranslationsTabs>
		{/snippet}
		{#snippet body(dialog)}
			<button
				class="button button-dashed mx-auto flex"
				data-danger
				form={$parentFormId}
				value={$form.id}
				formaction="?/deleteCategory"
				name="delete"
				bind:this={deleteRef}
			>
				{m.del()}<IconSpinner icon={TriangleAlert} busy={$parentFormSubmitter === deleteRef} />
			</button>
		{/snippet}
	</DescriptorFormDialog>
	<ul class="gap-gutter px-card-padding flex flex-row flex-wrap">
		{#each projectInterventionForms as projectInterventionFormData, i (projectInterventionFormData.id)}
			<li>
				<ProjectIntervention {projectInterventionFormData} {projectInterventionsForm} />
			</li>
		{/each}
		<li><ProjectInterventionCreate data={projectInterventionCreateForm} {projectTypes} /></li>
	</ul>
</section>
