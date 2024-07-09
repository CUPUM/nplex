<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import ProjectCard from '$lib/components/patterns/project-card.svelte';
	import ProjectCreateCard from '$lib/components/patterns/project-create-card.svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, constraints, errors, submitting } = superForm(data.filtersForm);
</script>

<DashboardSubHeader>
	<h2>
		{m.projects_edit()}
	</h2>
</DashboardSubHeader>
<ul
	class="p-padding bg-card/softer rounded-section gap-gap grid grid-cols-[repeat(auto-fit,minmax(var(--width-xs),1fr))]"
>
	<li class="aspect-square">
		<ProjectCreateCard />
	</li>
	{#each data.results as project, i (project.id)}
		<li
			animate:flip={{ duration: (l) => 150 + l / 100 }}
			in:fly|global={{ y: -6, duration: 350, easing: expoOut, delay: i * 25, opacity: 0 }}
			class="aspect-square"
		>
			<ProjectCard {...project} edit />
		</li>
	{/each}
</ul>
