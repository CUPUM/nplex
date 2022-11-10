<script lang="ts">
	import { enhance } from '$app/forms';
	import Map from '$components/Map.svelte';
	import type { PageData } from './$types';
	import MapProjects from './MapProjects.svelte';

	export let data: PageData;
</script>

<div id="panes">
	<form action="" use:enhance>
		Filtres
		<fieldset>Filtre 1</fieldset>
	</form>
	<Map class="map">
		<MapProjects projects={data.projects} />
	</Map>
	<ul>
		{#each data.projects as p}
			<li>{p}</li>
		{/each}
	</ul>
</div>

<style lang="scss" module>
	#panes {
		position: relative;
		flex: 1 0 auto;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		padding: 1rem;
		padding-top: 0;
		height: calc(100vh - var(--navbar-height-px));
	}

	form {
		all: unset;
		padding: 1rem;
		border-radius: 1rem;
		background: white;
	}

	fieldset {
		all: unset;
	}

	.map {
		flex: 1;
		height: 100%;
		min-height: 0px;
		border-radius: 1.5rem;
	}
</style>
