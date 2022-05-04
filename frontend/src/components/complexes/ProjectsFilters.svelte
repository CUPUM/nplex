<script lang="ts">
	import { customScrollbar } from '$actions/customScrollbar';
	import Checkbox from '$components/primitives/Checkbox.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import Toggle from '$components/primitives/Toggle.svelte';
	import Token from '$components/primitives/Token.svelte';
	import TokenSet from '$components/primitives/TokenSet.svelte';
	import { projectsEnums } from '$stores/projects';
	// import { projectsFilters } from '$stores/search';
	import { width } from '$transitions/width';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
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
<section
	id="pane"
	on:submit|preventDefault
	on:input={submit}
	transition:width|local={{ duration: 350, easing: expoOut }}
>
	<form>
		<ProjectsFilter label="Vocations de site">
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
		box-shadow: 0 0 0 1px var(--color-light-900);
		border-radius: 1rem;
	}

	#form-title {
		/* position: sticky; */
		position: relative;
		font-size: var(--size-small);
		font-weight: 500;
		letter-spacing: 0.25px;
		top: 0;
		padding: 0.5em;
		margin: 0.5rem;
		display: block;
		background-color: var(--color-light-500);
		border-radius: 0.9rem;
		z-index: 10;
		color: rgba(var(--rgb-dark-100), 0.75);
		text-align: center;
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
			& :global > fieldset:not(:hover) {
				/* opacity: 0.75; */
				background-color: transparent;
			}
		}
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
