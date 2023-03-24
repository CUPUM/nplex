<script lang="ts">
	import Dirty from '$components/Dirty.svelte';
	import Loading from '$components/Loading.svelte';
	import { editorDirtyValues } from '../../../common';
	import { projectData } from '../common';
	import AdjacentStreets from './AdjacentStreets.svelte';
	import Areas from './Areas.svelte';
	import ConstructionYear from './ConstructionYear.svelte';
	import District from './District.svelte';
	import ImplantationMode from './ImplantationMode.svelte';
	import Levels from './Levels.svelte';
	import Location from './Location.svelte';

	export let data;
</script>

<!-- Tracking dirty fields -->
<Dirty
	sample={data.project.adjacent_streets}
	specimen={$projectData.adjacent_streets}
	bind:dirty={$editorDirtyValues.adjacent_streets}
/>
<Dirty
	sample={data.project.location}
	specimen={$projectData.location}
	bind:dirty={$editorDirtyValues.location}
	strictOrder
/>
<!-- Form content -->
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
		{#await import('./LocalisationMap.svelte')}
			<Loading style="font-size: 2em; opacity: .5" />
		{:then LocalisationMap}
			<svelte:component this={LocalisationMap.default} />
		{/await}
	</section>
	<section class="fields">
		<Location />
		<District />
		<Areas />
		<AdjacentStreets />
		<ImplantationMode />
		<Levels />
		<ConstructionYear />
		<!-- <Footprint /> -->
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
