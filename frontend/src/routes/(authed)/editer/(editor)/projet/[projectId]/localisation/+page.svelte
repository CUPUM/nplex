<script lang="ts">
	import AdjacentStreets from './AdjacentStreets.svelte';
	import Area from './Area.svelte';
	import District from './District.svelte';
	import LocalisationMap from './LocalisationMap.svelte';
	import Location from './Location.svelte';

	export let data;
</script>

<div>
	<section class="map">
		<LocalisationMap />
	</section>
	<section class="fields">
		<Location />
		<Area />
		<District />
		<AdjacentStreets />
		<!-- <ImplantationMode /> -->
		<!-- <Levels /> -->
		<!-- <ConstructionYear /> -->
		<!-- <Footprint /> -->
	</section>
</div>

<style lang="scss">
	div {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--ui-gutter);
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
