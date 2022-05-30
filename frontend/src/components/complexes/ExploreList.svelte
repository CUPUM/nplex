<script lang="ts" context="module">
	export interface ExploreList {
		display: 'row' | 'column' | 'mosaic';
	}
</script>

<script lang="ts">
	import { category } from '$stores/search';
	import { width } from '$transitions/width';
	import { Ctx } from '$utils/contexts';
	import { setContext } from 'svelte';
	import ActorsList from './ActorsList.svelte';
	import OrganisationsList from './OrganisationsList.svelte';
	import ProjectsList from './ProjectsList.svelte';

	/** Disposition of projects' cards; */
	export let display: ExploreList['display'] = 'column';
	/** Array of projects' summary data. */
	export let projects: any[] = [];

	setContext<ExploreList>(Ctx.ExploreList, {
		display,
	});
</script>

<section class={display} transition:width={{}}>
	{#if $category === 'projects'}
		<ProjectsList />
	{:else if $category === 'organisations'}
		<OrganisationsList />
	{:else if $category === 'actors'}
		<ActorsList />
	{/if}
</section>

<style lang="postcss">
	section {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: visible;
		padding-top: 4.5rem;
		padding-bottom: 2rem;
		padding-inline: 1rem;
		margin-bottom: 0 !important;
		border-radius: 2rem;
		overflow-y: overlay;
	}

	.row {
		flex-direction: row;
	}

	.column {
		flex-direction: column;
	}
</style>
