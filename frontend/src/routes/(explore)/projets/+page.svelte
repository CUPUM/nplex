<script lang="ts">
	import Map from '$components/Map.svelte';
	import type { PageData } from './$types';
	import MapProjects from './MapProjects.svelte';

	export let data: PageData;
</script>

<div id="panes">
	<Map class="map">
		<MapProjects projects={data.projects} />
	</Map>
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

	.map {
		flex: 1;
		height: 100%;
		min-height: 0px;
		border-radius: 1.5rem;
	}
</style>
