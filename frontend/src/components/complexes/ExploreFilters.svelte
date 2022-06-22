<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Loading from '$components/primitives/Loading.svelte';
	import Token from '$components/primitives/Token.svelte';
	import { showExploreFilters } from '$stores/explore';
	import { projectsEnums } from '$stores/projects';
	import { crossfadeExploreFiltersButton } from '$transitions/crossfades';
	import { width } from '$transitions/width';
	import { onMount } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import ProjectsFilter from './ProjectsFilter.svelte';

	const [send, receive] = crossfadeExploreFiltersButton;

	function close() {
		showExploreFilters.set(false);
	}

	function submit(e) {
		// Do stuff
	}

	onMount(() => {
		if (!$projectsEnums) {
			projectsEnums.subscribe(() => {});
		}
	});
</script>

<section
	class="filters"
	on:submit|preventDefault
	on:input={submit}
	transition:width|local={{ duration: 350, easing: expoOut }}
>
	<div id="filters-close" in:receive={{ key: '' }} out:send={{ key: '' }}>
		<Button on:click={close}>
			<Icon slot="icon" name="cross" />
		</Button>
	</div>
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

<style lang="scss">
	.filters {
		position: relative;
		flex: none;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		padding: 0;
		width: var(--search-width);
		margin-left: 1rem;
		margin-right: 0;
		margin-bottom: 1rem;
		overflow-x: hidden;
		// border-radius: 2rem;
		transition: all 0.25s ease-out;
	}

	form {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
		width: var(--search-width);
		overflow-x: hidden;
		overflow-y: visible;
		padding: 0;
		margin: 0;
		// background-color: white;
	}

	.sub-title {
		font-weight: 600;
		font-size: var(--size-small);
		padding-block: 0;
		padding-inline: 0.25em;
		margin-bottom: 1em;
		color: var(--color-dark-900);
	}

	.tokenset:not(:last-child) {
		margin-bottom: 2em;
	}

	#filters-close {
		font-size: var(--size-small);
		padding: 0;
		margin: 0;
		z-index: 2;
		flex: none;
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
</style>
