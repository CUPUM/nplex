<script lang="ts">
	import * as m from '$i18n/messages';
	import ButtonSaveAll from '$lib/components/patterns/button-save-all.svelte';
	import { extendSuperForm } from '$lib/crud/form/client';
	import { superForm } from 'sveltekit-superforms';
	import type { Snapshot } from './$types.js';
	import ProjectTextDetailsForm from './project-text-details-form.svelte';

	let { data } = $props();

	let smallScale = $state(false);

	export const snapshot: Snapshot<{ smallScale: boolean }> = {
		capture() {
			return { smallScale };
		},
		restore(snapshot) {
			smallScale = snapshot.smallScale;
		},
	};

	const projectForm = extendSuperForm(
		superForm(data.form, {
			dataType: 'json',
			invalidateAll: 'force',
		})
	);

	const { submitter, enhance } = projectForm;
</script>

<form use:enhance action="?/update" method="POST" class="dashboard-section">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2>
				{m.project_general()}
			</h2>
			<p class="dim">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis accusantium, eius vero
				tenetur voluptatibus ducimus harum itaque praesentium qui cupiditate!
			</p>
		</hgroup>
	</header>
	<ProjectTextDetailsForm {...projectForm} />
	<!-- <ProjectType {form} types={data.types} /> -->
	<!-- <ProjectInterventions {form} categorizedInterventions={data.categorizedInterventions} /> -->
	<!-- <ProjectOwnership {form} siteOwnerships={data.siteOwnerships} /> -->
	<!-- <ProjectCost {form} bind:smallScale /> -->
	<menu class="dashboard-section-menu">
		<ButtonSaveAll submitter={$submitter} />
	</menu>
</form>
