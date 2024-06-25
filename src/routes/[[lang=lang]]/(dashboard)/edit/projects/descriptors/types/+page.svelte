<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import ProjectTypeCreate from './project-type-create.svelte';
	import ProjectType from './project-type.svelte';

	let { data } = $props();

	const projectTypesForm = extendedSuperForm(data.projectTypesForm, {
		invalidateAll: true,
	});

	const { formId, enhance } = projectTypesForm;
</script>

<DashboardSubSection>
	{#snippet header()}
		<h2>{m.project_types()}</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
			consequatur amet blanditiis sed alias. Eum, numquam magnam!
		</p>
	{/snippet}
	<form id={$formId} class="sr-only" use:enhance method="POST"></form>
	<ul class="gap-gutter flex flex-row flex-wrap">
		<li>
			<ProjectTypeCreate data={data.projectTypeCreateForm} />
		</li>
		{#each data.projectTypeForms as projectTypeFormData, i (projectTypeFormData.id)}
			<li>
				<ProjectType {projectTypeFormData} {projectTypesForm} />
			</li>
		{/each}
	</ul>
</DashboardSubSection>
