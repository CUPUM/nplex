<script lang="ts">
	import * as m from '$i18n/messages';
	import { extendSuperForm } from '$lib/crud/form/client';
	import { superForm } from 'sveltekit-superforms';
	import ProjectType from './project-type.svelte';

	let { data } = $props();

	const projectTypesForm = extendSuperForm(superForm(data.projectTypesForm));

	const { formId } = projectTypesForm;
</script>

<section class="dashboard-section">
	<h2 class="dashboard-section-title">{m.project_types()}</h2>
	<div class="dashboard-section-description">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
			consequatur amet blanditiis sed alias. Eum, numquam magnam!
		</p>
	</div>
	<form id={$formId} class="sr-only"></form>
	<ul class="px-card-padding gap-gutter flex flex-row flex-wrap">
		<!-- <li>
				<ProjectTypesNew data={data.newTypeForm} />
			</li> -->
		{#each data.projectTypeForms as projectTypeFormData, i (projectTypeFormData.id)}
			<li>
				<ProjectType {projectTypeFormData} {projectTypesForm} />
			</li>
		{/each}
	</ul>
</section>
