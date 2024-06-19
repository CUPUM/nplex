<script lang="ts">
	import * as m from '$i18n/messages';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import ProjectExemplarityCategoryCreate from './project-exemplarity-category-create.svelte';
	import ProjectExemplarityCategory from './project-exemplarity-category.svelte';

	let { data } = $props();

	const projectExemplarityCategoriesListForm = extendedSuperForm(
		data.projectExemplarityCategoriesListForm,
		{ invalidateAll: true }
	);

	const { enhance: categoriesEnhance, formId: categoriesFormId } =
		projectExemplarityCategoriesListForm;

	const projectExemplarityMarkersListForm = extendedSuperForm(
		data.projectExemplarityMarkersListForm,
		{
			invalidateAll: true,
		}
	);

	const { enhance: markersEnhance, formId: markersFormId } = projectExemplarityMarkersListForm;
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
<form class="sr-only" id={$markersFormId} use:markersEnhance method="POST"></form>
{#each data.projectExemplarityMarkerAndCategoryForms as [categoryForm, projectInterventionCreateForm], i (categoryForm.id)}
	<ProjectExemplarityCategory
		{projectExemplarityMarkersListForm}
		{projectExemplarityCategoriesListForm}
		data={categoryForm}
		projectExemplarityMarkerForms={data.projectExemplarityMarkerForms.filter(
			(intervention) => intervention.data.categoryId === categoryForm.data.id
		)}
		{projectInterventionCreateForm}
	/>
{/each}
<section
	class="dashboard-section border-dim p-card-padding items-start border border-dashed bg-transparent"
>
	<ProjectExemplarityCategoryCreate data={data.projectExemplarityCategoryCreateForm} />
</section>
