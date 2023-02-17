<script lang="ts">
	import type { PageData } from './$types';
	import Area from './Area.svelte';
	import District from './District.svelte';
	import LocalisationMap from './LocalisationMap.svelte';
	import Location from './Location.svelte';

	export let data: PageData;
</script>

<div>
	<section class="map">
		<LocalisationMap />
	</section>
	<section class="fields">
		<Location />
		<hr />
		<Area />
		<hr />
		<District />
		<!-- <hr />
		<AdjacentStreets adjacent_streets={data.project.adjacent_streets} />
		<hr />
		<ImplantationMode />
		<hr />
		<Levels />
		<hr />
		<ConstructionYear />
		<hr />
		<Footprint /> -->
	</section>
</div>

<style lang="scss">
	div {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-flow: dense;
	}

	hr {
		grid-column: 1 / -1;
	}

	.map {
		--pad-top: calc(var(--ui-nav-h) + 1rem);
		padding-inline: 1.5rem;
		grid-column: 2;
		grid-row: 1;
		position: sticky;
		top: var(--pad-top);
		height: calc(100vh - var(--pad-top) - 7rem);
	}

	.fields {
		grid-column: 1 / -1;
		grid-row: 1;
		display: grid;
		grid-template-columns: inherit;
		gap: inherit;

		:global(.editor-section) {
			max-width: calc(var(--ui-width-main) / 2);
			grid-column: 1;
			justify-self: flex-end;
		}
	}
</style>
