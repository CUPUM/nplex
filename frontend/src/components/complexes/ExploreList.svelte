<script lang="ts" context="module">
	export interface ExploreListContext {
		display: 'row' | 'column' | 'mosaic';
		elementRef: HTMLElement;
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

	/**
	 * Pane's outer element ref used notably for intersection observers.
	 */
	let elementRef: HTMLElement;
	/**
	 * Disposition of projects' cards.
	 */
	export let display: ExploreListContext['display'] = 'column';

	setContext<ExploreListContext>(Ctx.ExploreList, {
		display,
		elementRef,
	});
</script>

<section class={display} transition:width={{}} bind:this={elementRef}>
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
		padding-top: 0;
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
