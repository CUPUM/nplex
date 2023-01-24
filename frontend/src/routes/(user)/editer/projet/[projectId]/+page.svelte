<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import type { ActionData, PageData } from './$types';
	import AdjacentStreets from './AdjacentStreets.svelte';
	import { descriptors, dirty, project } from './common';
	import CostRange from './CostRange.svelte';
	import Description from './Description.svelte';
	import Gallery from './Gallery.svelte';
	import Header from './Header.svelte';
	import Location from './Location.svelte';
	import ProjectMap from './ProjectMap.svelte';
	import SiteOwnership from './SiteOwnership.svelte';
	import SiteSecondaryUsages from './SiteSecondaryUsages.svelte';
	import SiteUsage from './SiteUsage.svelte';
	import Type from './Type.svelte';
	import Visibility from './Visibility.svelte';
	import Works from './Works.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: project.set({ ...data.project });
	$: descriptors.set({ ...data.descriptors });

	$: if (form) {
		console.log(form);
	}
</script>

<form
	method="POST"
	action="?/update"
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<!--
		One-way data bindings (downward) for reference "clean" data from the db.
		Two-way bindings are done with the $project store.
	-->
	<Header title={data.project.title} />
	<Description description={data.project.description} />
	<Type type_id={data.project.type_id} />
	<Works work_ids={data.project.work_ids} />
	<CostRange cost_range={data.project.cost_range} />
	<Gallery gallery={data.project.gallery} />
	<SiteOwnership ownershipId={data.project.site_ownership_id} />
	<SiteUsage
		usageId={data.project.site_usage_id}
		usageCategoryId={data.project.site_usage_category_id}
	/>
	<SiteSecondaryUsages secondaryUsages={data.project.secondary_usages} />

	<!-- Map-related formgroups -->
	<section class="split">
		<div class="mapfields">
			<Location geometry={data.project.location_geometry} radius={data.project.location_radius} />
			<AdjacentStreets adjacentStreets={data.project.adjacent_streets} />
		</div>
		<div class="map">
			<ProjectMap />
		</div>
	</section>
	<Visibility />
	{#if Object.values($dirty).filter((v) => v).length}
		<Button
			variant="cta"
			type="submit"
			style="position: sticky; bottom: 1.5rem; align-self: flex-end;">Soumettre</Button
		>
	{/if}
</form>

<style lang="scss" module>
	form {
		width: 100%;
		max-width: var(--ui-width-md);
		display: flex;
		align-items: stretch;
		flex-direction: column;
	}

	hr {
		background: col(primary, 100, 0.1);
	}

	.split {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.map {
		position: sticky;
		width: 100%;
		height: calc(100vh - var(--ui-nav-px) - 1.5rem);
		padding-inline: 1.5rem;
		top: var(--ui-nav-px);
		border-radius: var(--ui-radius-lg);
	}

	.mapfields {
	}
</style>
