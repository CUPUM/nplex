<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Loading from '$components/Loading.svelte';
	import { dirtyValues } from '$routes/(authed)/editer/common';
	import { project } from '../common';
	import AdjacentWays from './AdjacentWays.svelte';
	import Areas from './Areas.svelte';
	import ConstructionYear from './ConstructionYear.svelte';
	import ImplantationMode from './ImplantationMode.svelte';
	import Location from './Location.svelte';
	import Verticality from './Verticality.svelte';

	export let data;
</script>

<Dirty
	sample={data.project.location}
	specimen={$project.location}
	bind:dirty={$dirtyValues.location}
	strictOrder
/>
<Dirty
	sample={data.project.site_area}
	specimen={$project.site_area}
	bind:dirty={$dirtyValues.site_area}
/>
<Dirty
	sample={data.project.building_area}
	specimen={$project.building_area}
	bind:dirty={$dirtyValues.building_area}
/>
<Dirty
	sample={data.project.interventions_area}
	specimen={$project.interventions_area}
	bind:dirty={$dirtyValues.interventions_area}
/>
<Dirty
	sample={data.project.adjacent_streets}
	specimen={$project.adjacent_streets}
	bind:dirty={$dirtyValues.adjacent_streets}
/>
<Dirty
	sample={data.project.adjacent_alleys}
	specimen={$project.adjacent_alleys}
	bind:dirty={$dirtyValues.adjacent_alleys}
/>
<Dirty
	sample={data.project.implantation_mode}
	specimen={$project.implantation_mode}
	bind:dirty={$dirtyValues.implantation_mode}
/>
<Dirty
	sample={data.project.building_levels_basement}
	specimen={$project.building_levels_basement}
	bind:dirty={$dirtyValues.building_levels_basement}
	strictOrder
/>
<Dirty
	sample={data.project.building_levels_main}
	specimen={$project.building_levels_main}
	bind:dirty={$dirtyValues.building_levels_main}
	strictOrder
/>
<Dirty
	sample={data.project.building_levels_mezzanine}
	specimen={$project.building_levels_mezzanine}
	bind:dirty={$dirtyValues.building_levels_mezzanine}
	strictOrder
/>
<Dirty
	sample={data.project.building_construction_year}
	specimen={$project.building_construction_year}
	bind:dirty={$dirtyValues.building_construction_year}
	strictOrder
/>
<header class="editor-form-header">
	<h1 class="heading-lg">Localisation & bâtiment</h1>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis nostrum, dicta quis fugit
		vitae deleniti quos ipsam, fugiat inventore cupiditate iusto omnis explicabo iure eligendi
		dolores hic perferendis sint doloremque.
	</p>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dolores illum aliquam,
		delectus asperiores similique!
	</p>
</header>
<div id="editor-localisation">
	<section class="map">
		{#await import('./PlaceMap.svelte')}
			<Loading style="font-size: 2em; opacity: .5" />
		{:then PlaceMap}
			<svelte:component this={PlaceMap.default} />
		{/await}
	</section>
	<section class="fields">
		<Location />
		<!-- <District /> -->
		<Areas />
		<AdjacentWays />
		<ImplantationMode />
		<Verticality />
		<ConstructionYear />
	</section>
</div>

<style lang="scss">
	#editor-localisation {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--ui-gap-sm);
		flex: 1;
	}

	.map {
		align-self: flex-start;
		grid-column: 2;
		grid-row: 1;
		position: sticky;
		top: var(--ui-nav-h);
		height: calc(100vh - var(--ui-nav-h) - 1.5rem);
	}

	.fields {
		grid-column: 1;
		display: flex;
		flex-direction: column;
		gap: inherit;

		:global(.editor-section) {
			max-width: calc(var(--ui-width-main) / 2);
			grid-column: 1;
			justify-self: flex-end;
		}
	}
</style>
