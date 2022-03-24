<script lang="ts">
	import { customScrollbar } from '$actions/customScrollbar';
	import Loading from '$components/primitives/Loading.svelte';
	import Toggle from '$components/primitives/Toggle.svelte';
	import Token from '$components/primitives/Token.svelte';
	import { projectsEnums } from '$stores/projects';
	import { projectsFilters } from '$stores/search';
	import { width } from '$transitions/width';
	import { slide } from 'svelte/transition';
	import ProjectsFilter from './ProjectsFilter.svelte';

	function submit(e) {
		console.log(e);
	}
</script>

<!-- use:customScrollbar={{ overflowBehavior: { x: 'hidden' } }} -->
<section on:submit|preventDefault on:input={submit} transition:width|local={{ duration: 350 }}>
	<form>
		<ProjectsFilter legend="Domaines de projets">
			{#each $projectsEnums?.projects_domains as domain}
				<Toggle />
			{/each}
		</ProjectsFilter>
		<ProjectsFilter legend="Types de sites">
			<p>test1</p>
			<p>test2</p>
			<p>test3</p>
		</ProjectsFilter>
		<ProjectsFilter legend="Fourchettes de valeur">
			<p>test1</p>
			<p>test2</p>
			<p>test3</p>
		</ProjectsFilter>
		<ProjectsFilter legend="Fourchettes de valeur">
			<p>test1</p>
			<p>test2</p>
			<p>test3</p>
		</ProjectsFilter>
		<ProjectsFilter legend="Fourchettes de valeur">
			<p>test1</p>
			<p>test2</p>
			<p>test3</p>
		</ProjectsFilter>
	</form>
</section>

<style lang="postcss">
	section {
		position: relative;
		background-color: var(--color-light-100);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 0;
		--pane-width: 400px;
		width: var(--pane-width);
		transition: all 0.15s ease-out;
	}

	section:hover {
		background-color: var(--color-light-300);
	}

	form {
		position: relative;
		display: flex;
		flex-direction: column;
		font-size: var(--size-medium);
		gap: 0.5em;
		width: var(--pane-width);
		overflow-x: visible;
		overflow-y: overlay;
		padding: 0.5em;
		margin: 0;
	}

	fieldset {
		border: none;
		margin: 0;
		position: relative;
		width: 100%;
		height: 500px;
	}
</style>
