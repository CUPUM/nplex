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
		<ul>
			<li>org card</li>
			<li>org card</li>
			<li>org card</li>
			<li>org card</li>
			<li>org card</li>
			<li>org card</li>
			<li>org card</li>
			<li>org card</li>
		</ul>
	{:else if $category === 'actors'}
		<ul>
			<li>actor card</li>
			<li>actor card</li>
			<li>actor card</li>
			<li>actor card</li>
			<li>actor card</li>
			<li>actor card</li>
			<li>actor card</li>
			<li>actor card</li>
		</ul>
	{/if}
</section>

<style>
	section {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: visible;
		padding-block: 2rem;
		padding-inline: 1rem;
		margin-bottom: 0 !important;
		/* overflow-y: visible;
		overflow-x: scroll; */
	}

	.row {
		flex-direction: row;
	}

	.column {
		flex-direction: column;
	}
</style>
