<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import DescriptorFormDialog from '$lib/components/patterns/descriptor-form-dialog.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import TranslationsTabs from '$lib/components/patterns/translations-tabs.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { extendedSuperForm, type ExtendedSuperFormData } from '$lib/crud/form/client';
	import { TriangleAlert, Wrench } from 'lucide-svelte';
	import type { PageData } from './$types';
	import ProjectExemplarityMarkerCreate from './project-exemplarity-marker-create.svelte';
	import ProjectExemplarityMarker from './project-exemplarity-marker.svelte';

	let {
		data,
		projectExemplarityCategoriesListForm,
		projectInterventionCreateForm,
		projectExemplarityMarkerForms,
		projectExemplarityMarkersListForm,
	}: {
		data: PageData['projectExemplarityMarkerAndCategoryForms'][number][0];
		projectExemplarityCategoriesListForm: ExtendedSuperFormData<
			PageData['projectExemplarityCategoriesListForm']
		>;
		projectExemplarityMarkersListForm: ExtendedSuperFormData<
			PageData['projectExemplarityMarkersListForm']
		>;
		projectInterventionCreateForm: PageData['projectExemplarityMarkerAndCategoryForms'][number][1];
	} & Pick<PageData, 'projectExemplarityMarkerForms'> = $props();

	const projectInterventionCategoryForm = extendedSuperForm(data, { dataType: 'json' });
	const { form, constraints } = projectInterventionCategoryForm;
	const {
		formId: parentFormId,
		submitter: parentFormSubmitter,
		form: parentForm,
	} = projectExemplarityCategoriesListForm;

	let deleteRef = $state<HTMLButtonElement>();
</script>

<DashboardSubSection>
	{#snippet header()}
		<DescriptorFormDialog form={projectInterventionCategoryForm} action="?/updateCategory">
			{#snippet root(triggerAttributes)}
				<h4>
					<button
						{...triggerAttributes}
						class="aria-[expanded=true]:text-primary gap-input-gutter text-md group/button duration-fast hover:text-primary flex cursor-pointer flex-row items-center font-semibold transition-all"
					>
						{$form.translations[$page.data.lang].title}
						<div class="button compact aspect-square rounded-full text-sm"><Wrench /></div>
					</button>
				</h4>
			{/snippet}
			{#snippet title()}
				{m.project_exemplarity_category()}
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
			<hr class="mb-0" />
			<button
				class="button button-dashed"
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
		</DescriptorFormDialog>
	{/snippet}
	<ul class="gap-gutter flex flex-row flex-wrap">
		{#each projectExemplarityMarkerForms as projectInterventionFormData, i (projectInterventionFormData.id)}
			<li>
				<ProjectExemplarityMarker
					{projectInterventionFormData}
					{projectExemplarityMarkersListForm}
				/>
			</li>
		{/each}
		<li><ProjectExemplarityMarkerCreate data={projectInterventionCreateForm} /></li>
	</ul>
</DashboardSubSection>
