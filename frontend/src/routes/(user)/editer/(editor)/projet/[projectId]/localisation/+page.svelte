<script lang="ts">
	import { enhance } from '$app/forms';
	import ImplantationMode from '../ImplantationMode.svelte';
	import type { PageData } from './$types';
	import AdjacentStreets from './AdjacentStreets.svelte';
	import Area from './Area.svelte';
	import ConstructionYear from './ConstructionYear.svelte';
	import District from './District.svelte';
	import Footprint from './Footprint.svelte';
	import Levels from './Levels.svelte';
	import LocalisationMap from './LocalisationMap.svelte';
	import Location from './Location.svelte';

	export let data: PageData;
</script>

<form
	method="POST"
	action="?/update"
	use:enhance
	use:enhance={({ form, data, action, cancel }) => {
		return async ({ update, result }) => {
			update({ reset: false });
		};
	}}
>
	<div class="map">
		<LocalisationMap />
	</div>
	<div class="fields">
		<Location />
		<hr />
		<Area />
		<hr />
		<District />
		<hr />
		<AdjacentStreets adjacent_streets={data.project.adjacent_streets} />
		<hr />
		<ImplantationMode />
		<hr />
		<Levels />
		<hr />
		<ConstructionYear />
		<hr />
		<Footprint />
	</div>
</form>

<style lang="scss">
	form {
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
		border-radius: var(--ui-radius-lg);
		max-width: calc(var(--ui-width-main) / 2);
		// box-shadow: var(--ui-shadow-lg);
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
