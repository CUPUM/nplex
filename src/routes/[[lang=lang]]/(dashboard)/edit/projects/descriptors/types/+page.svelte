<script lang="ts">
	import * as m from '$i18n/messages';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import ProjectTypeCreate from './project-type-create.svelte';
	import ProjectType from './project-type.svelte';

	let { data } = $props();

	const projectTypesForm = extendedSuperForm(data.projectTypesForm, {
		invalidateAll: true,
	});

	const { formId, enhance } = projectTypesForm;
</script>

<section class="dashboard-section">
	<h2 class="dashboard-section-title">{m.project_types()}</h2>
	<div class="dashboard-section-description">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
			consequatur amet blanditiis sed alias. Eum, numquam magnam!
		</p>
	</div>
	<form id={$formId} class="sr-only" use:enhance method="POST"></form>
	<ul class="px-card-padding gap-gutter flex flex-row flex-wrap">
		<li>
			<ProjectTypeCreate data={data.projectTypeCreateForm} />
		</li>
		{#each data.projectTypeForms as projectTypeFormData, i (projectTypeFormData.id)}
			<li>
				<ProjectType {projectTypeFormData} {projectTypesForm} />
			</li>
		{/each}
	</ul>
</section>
