<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import ProjectCard from '$lib/components/patterns/project-card.svelte';
	import ProjectCreateCard from '$lib/components/patterns/project-create-card.svelte';
	import { ArrowRight, Search } from 'lucide-svelte';
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
<DashboardSubSection class="bg-card/softest">
	<form
		method="GET"
		class="input-group top-sticky-top sticky z-10 max-w-md self-stretch backdrop-blur-md"
	>
		<Search />
		<input type="search" class="input" name="search" />
		<div class="input-peer">
			<button class="button aspect-square"><ArrowRight /></button>
		</div>
	</form>
	<ul class="gap-gap grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] self-stretch">
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
</DashboardSubSection>
