<script lang="ts">
	import * as m from '$i18n/messages';
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

<header class="dashboard-section">
	<h2 class="dashboard-section-title">
		{m.project_intervention_categories()} & {m.project_intervention_types().toLocaleLowerCase()}
	</h2>
	<div class="dashboard-section-description">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
			consequatur amet blanditiis sed alias. Eum, numquam magnam!
		</p>
	</div>
</header>
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
<section
	class="dashboard-section border-dim p-card-padding items-start border border-dashed bg-transparent"
>
	<ProjectInterventionCategoryCreate data={data.projectInterventionCategoryCreateForm} />
</section>
