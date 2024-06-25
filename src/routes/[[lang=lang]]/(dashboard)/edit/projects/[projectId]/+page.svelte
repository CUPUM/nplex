<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSectionMenu from '$lib/components/patterns/dashboard-section-menu.svelte';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { Check } from 'lucide-svelte';
	import type { Snapshot } from './$types.js';
	import ProjectInterventions from './project-interventions.svelte';
	import ProjectOwnership from './project-ownership.svelte';
	import ProjectTextDetails from './project-text-details.svelte';
	import ProjectType from './project-type.svelte';

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

	const projectForm = extendedSuperForm(data.form, {
		dataType: 'json',
		invalidateAll: 'force',
	});

	const { submitter, enhance, isTainted, tainted } = projectForm;

	let submitRef = $state<HTMLButtonElement>();
</script>

<form use:enhance action="?/update" method="POST" class="gap-inherit flex flex-col">
	<DashboardSubHeader>
		<h3>
			{m.project_general()}
		</h3>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum incidunt rem temporibus,
			eaque a atque iste fuga ea minima omnis rerum provident ullam laboriosam perferendis optio,
			blanditiis, quo possimus doloribus sed laudantium repudiandae vitae? Illum aut vel ipsa vero
			facilis possimus consequuntur error ea? Accusamus ab exercitationem obcaecati facere eius?
		</p>
	</DashboardSubHeader>
	<ProjectTextDetails {...projectForm} />
	<ProjectType {...projectForm} types={data.types} />
	<ProjectInterventions
		{...projectForm}
		interventionsByCategories={data.interventionsByCategories}
	/>
	<ProjectOwnership {...projectForm} siteOwnerships={data.siteOwnerships} />
	<!-- <ProjectCost {...projectForm} bind:smallScale /> -->
	<DashboardSectionMenu>
		<button class="button button-cta" bind:this={submitRef} disabled={!isTainted($tainted)}>
			{m.save()}<IconSpinner icon={Check} busy={submitRef === $submitter} />
		</button>
	</DashboardSectionMenu>
</form>
