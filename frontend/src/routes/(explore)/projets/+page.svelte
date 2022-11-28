<script lang="ts">
	import { enhance } from '$app/forms';
	import Map from '$components/Map.svelte';
	import type { PageData } from './$types';
	import MapProjects from './MapProjects.svelte';

	export let data: PageData;
</script>

<div class="projects">
	<Map>
		<MapProjects projects={data.projects} />
	</Map>
	<form action="" use:enhance>
		Filtres
		<fieldset>Filtre 1</fieldset>
	</form>
	<ul>
		{#each data.projects as p}
			<li>{p}</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.projects {
		position: relative;
		flex: 1 0 auto;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		padding: 1rem;
		padding-top: 0;
		height: 100vh;
		padding-top: var(--navbar-height-px);
		margin-top: calc(-1 * var(--navbar-height-px));
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

	.projects :global(.map) {
		// position: absolute;
		flex: none;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
</style>
