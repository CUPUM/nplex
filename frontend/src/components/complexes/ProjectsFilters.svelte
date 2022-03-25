<script lang="ts">
	import { customScrollbar } from '$actions/customScrollbar';
	import Checkbox from '$components/primitives/Checkbox.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import Toggle from '$components/primitives/Toggle.svelte';
	import Token from '$components/primitives/Token.svelte';
	import TokenSet from '$components/primitives/TokenSet.svelte';
	import { projectsEnums } from '$stores/projects';
	import { projectsFilters } from '$stores/search';
	import { width } from '$transitions/width';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import ProjectsFilter from './ProjectsFilter.svelte';

	function submit(e) {
		console.log(e);
	}

	onMount(() => {
		if (!$projectsEnums) {
			projectsEnums.subscribe(() => {});
		}
	});
</script>

<!-- use:customScrollbar={{ overflowBehavior: { x: 'hidden' } }} -->
<section id="pane" on:submit|preventDefault on:input={submit} transition:width|local={{ duration: 350 }}>
	<form>
		<ProjectsFilter label="Domaines de projets">
			{#if $projectsEnums}
				{#each $projectsEnums.projects_domains as domain}
					<Checkbox>{domain.title}</Checkbox>
				{/each}
			{:else}
				<Loading />
			{/if}
		</ProjectsFilter>
		<ProjectsFilter label="Types de sites">
			{#if $projectsEnums}
				{#each $projectsEnums.projects_sites_types_groups as group}
					{#if group.types.length}
						<TokenSet label={group.title}>
							{#each group.types as type}
								<Token>{type.title}</Token>
							{/each}
						</TokenSet>
					{/if}
				{/each}
			{:else}
				<Loading />
			{/if}
		</ProjectsFilter>
		<ProjectsFilter label="Fourchettes de valeur">
			<p>test1</p>
			<p>test2</p>
			<p>test3</p>
		</ProjectsFilter>
		<ProjectsFilter label="Fourchettes de valeur">
			<p>test1</p>
			<p>test2</p>
			<p>test3</p>
		</ProjectsFilter>
		<ProjectsFilter label="Fourchettes de valeur">
			<p>test1</p>
			<p>test2</p>
			<p>test3</p>
		</ProjectsFilter>
	</form>
</section>

<style lang="postcss">
	#pane {
		position: relative;
		background-color: var(--color-light-100);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 0;
		--pane-width: 400px;
		width: var(--pane-width);
		overflow: hidden;
		box-shadow: 0 1rem 7rem -5rem var(--color-primary-900), 0 0 0 1px var(--color-light-500);
		transition: all 0.15s ease-out;
	}

	form {
		position: relative;
		display: flex;
		min-height: 100%;
		flex-direction: column;
		font-size: var(--size-medium);
		gap: 0;
		width: var(--pane-width);
		overflow-x: visible;
		overflow-y: overlay;
		padding: 0;
		margin: 0;

		&:hover {
			& :global > *:not(:hover) {
				opacity: 0.5;
			}
		}
	}
</style>
