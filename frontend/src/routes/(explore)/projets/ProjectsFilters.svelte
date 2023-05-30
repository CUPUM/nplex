<script lang="ts">
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import ProjectsFilterCostRange from './ProjectsFilterCostRange.svelte';
	import { projectsFiltersOpened } from './common';

	function search(e: Event) {
		e.preventDefault();
	}
</script>

{#if $projectsFiltersOpened}
	<section
		id="projects-filters"
		in:fly={{ x: '-2rem', duration: 350, easing: expoOut, opacity: 0 }}
		out:fly|local={{ x: '-2rem', duration: 250, easing: expoOut, opacity: 0 }}
	>
		<form class="inner">
			<ProjectsFilterCostRange />
			<ProjectsFilterCostRange />
			<ProjectsFilterCostRange />
		</form>
	</section>
{/if}

<style lang="scss">
	#projects-filters {
		z-index: 1;
		position: relative;
		grid-column: filters;
		grid-row: 1;
		padding-top: var(--projects-top-overlay-h);
		padding-bottom: var(--ui-gutter-sm);
		align-self: stretch;
		justify-content: flex-start;
		transform-origin: top left;
	}

	form {
		display: flex;
		flex-direction: column;
		border-radius: var(--ui-radius-lg);
		width: var(--projects-filters-w);
		height: 100%;
		align-items: stretch;
		justify-content: flex-start;
		gap: var(--ui-gutter-xs);
	}
</style>
