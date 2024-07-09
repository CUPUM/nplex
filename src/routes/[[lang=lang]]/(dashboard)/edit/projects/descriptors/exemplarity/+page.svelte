<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
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

<DashboardSubHeader>
	<h2>
		{m.project_exemplarity_categories()} & {m.project_exemplarity_markers().toLocaleLowerCase()}
	</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
		consequatur amet blanditiis sed alias. Eum, numquam magnam!
	</p>
</DashboardSubHeader>
<form class="sr-only" id={$categoriesFormId} use:categoriesEnhance method="POST"></form>
<form class="sr-only" id={$markersFormId} use:markersEnhance method="POST"></form>
{#each data.projectExemplarityMarkerAndCategoryForms as [categoryForm, projectInterventionCreateForm], i (categoryForm.id)}
	<ProjectExemplarityCategory
		{projectExemplarityMarkersListForm}
		{projectExemplarityCategoriesListForm}
		data={categoryForm}
		projectExemplarityMarkerForms={data.projectExemplarityMarkerForms.filter(
			(marker) => marker.data.categoryId === categoryForm.data.id
		)}
		{projectInterventionCreateForm}
	/>
{/each}
<DashboardSubSection class="border-base/softer border border-dashed bg-transparent">
	<ProjectExemplarityCategoryCreate data={data.projectExemplarityCategoryCreateForm} />
</DashboardSubSection>
