<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import ProjectInterventionCategoryCreate from './project-intervention-category-create.svelte';
	import ProjectInterventionCategory from './project-intervention-category.svelte';

	let { data } = $props();

	const projectInterventionCategoriesForm = extendedSuperForm(
		data.projectInterventionsCategoriesForm,
		{ invalidateAll: true }
	);

	const { enhance: categoriesEnhance, formId: categoriesFormId } =
		projectInterventionCategoriesForm;

	const projectInterventionsForm = extendedSuperForm(data.projectInterventionsForm, {
		invalidateAll: true,
	});

	const { enhance: interventionsEnhance, formId: interventionsFormId } = projectInterventionsForm;
</script>

<DashboardSubHeader>
	<h2>
		{m.project_intervention_categories()} & {m.project_intervention_types().toLocaleLowerCase()}
	</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
		consequatur amet blanditiis sed alias. Eum, numquam magnam!
	</p>
</DashboardSubHeader>
<form class="sr-only" id={$categoriesFormId} use:categoriesEnhance method="POST"></form>
<form class="sr-only" id={$interventionsFormId} use:interventionsEnhance method="POST"></form>
{#each data.projectInterventionAndCategoryForms as [categoryForm, projectInterventionCreateForm], i (categoryForm.id)}
	<ProjectInterventionCategory
		{projectInterventionsForm}
		{projectInterventionCategoriesForm}
		data={categoryForm}
		projectInterventionForms={data.projectInterventionForms.filter(
			(intervention) => intervention.data.categoryId === categoryForm.data.id
		)}
		{projectInterventionCreateForm}
		projectTypes={data.projectTypes}
	/>
{/each}
<DashboardSubSection class="border-base/softer border border-dashed bg-transparent">
	<ProjectInterventionCategoryCreate data={data.projectInterventionCategoryCreateForm} />
</DashboardSubSection>
