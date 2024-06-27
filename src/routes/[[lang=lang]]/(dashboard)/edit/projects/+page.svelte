<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';
	import ProjectCard from './project-card.svelte';
	import ProjectCreateCard from './project-create-card.svelte';

	let { data } = $props();

	const { form, constraints, errors, submitting } = superForm(data.filtersForm);

	let clearSearchParam = $derived.by(() => {
		const q = new URLSearchParams($page.url.searchParams);
		q.delete('search');
		return q.toString();
	});
</script>

<DashboardSubHeader>
	<h2>
		{m.projects_edit()}
	</h2>
</DashboardSubHeader>
<ul class="gap-gutter grid grid-cols-[repeat(auto-fit,minmax(var(--width-xs),1fr))]">
	<li>
		<ProjectCreateCard />
	</li>
	{#each data.results as project, i (project.id)}
		<li
			animate:flip={{ duration: (l) => 150 + l / 100 }}
			in:fly|global={{ y: -6, duration: 350, easing: expoOut, delay: i * 25, opacity: 0 }}
		>
			<ProjectCard {project} />
		</li>
	{/each}
</ul>
