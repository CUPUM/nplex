<script lang="ts">
	import Loading from '$components/primitives/Loading.svelte';
	import Token from '$components/primitives/Token.svelte';
	import { projectsEnums } from '$stores/projects';
	// import { projectsFilters } from '$stores/search';
	import { width } from '$transitions/width';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
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

<section on:submit|preventDefault on:input={submit} transition:width|local={{ duration: 350, easing: expoOut }}>
	<form>
		<ProjectsFilter label="Types de sites">
			{#if $projectsEnums}
				{#each $projectsEnums.projects_sites_types_groups as group}
					{#if group.types.length}
						<section class="tokenset">
							<legend class="sub-title">{group.title}</legend>
							{#each group.types as type}
								<Token variant="ghost" style="margin: 3px;">{type.title}</Token>
							{/each}
						</section>
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
	section {
		position: relative;
		flex: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 0;
		padding-top: var(--menu-height);
		width: var(--search-width);
		overflow: hidden;
		border-radius: 2rem;
		margin-left: 1rem;
		margin-right: 1rem;
		margin-bottom: 1rem;
		background-color: white;
	}

	form {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		width: var(--search-width);
		overflow-x: hidden;
		overflow-y: overlay;
		padding: 0;
		margin: 0;
	}

	.sub-title {
		font-weight: 600;
		font-size: var(--size-small);
		/* letter-spacing: 0.5px; */
		/* text-transform: uppercase; */
		padding-block: 0;
		padding-inline: 0.25em;
		margin-bottom: 1em;
		color: var(--color-dark-900);
	}

	.tokenset:not(:last-child) {
		margin-bottom: 2em;
	}
</style>
