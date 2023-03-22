<script lang="ts">
	import AdjacentStreets from './AdjacentStreets.svelte';
	import Area from './Area.svelte';
	import District from './District.svelte';
	import Location from './Location.svelte';

	export let data;
</script>

<header class="editor-tab-header">
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
<div>
	<section class="map">
		{#await import('./PlaceMap.svelte')}
			Loading map..../PlaceMap.svelte
		{:then PlaceMap}
			<svelte:component this={PlaceMap.default} />
		{/await}
		<!-- <LocalisationMap /> -->
	</section>
	<section class="fields">
		<Location />
		<Area />
		<District />
		<AdjacentStreets adjacent_streets={data.project.adjacent_streets} />
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
