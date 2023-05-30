<script lang="ts">
	import MapMarker from '$components/Map/MapMarker.svelte';
	import MapPopup from '$components/Map/MapPopup.svelte';
	import { toLngLatLike } from '$utils/format';
	import type { PageData } from './$types';

	export let current: null | {};
	export let project: PageData['projects'][number];

	const key = {};
	const lnglat = toLngLatLike(project.location_obfuscated.coordinates);

	function toggle(e: MouseEvent) {
		e.stopImmediatePropagation();
		current = current === key ? null : key;
	}
</script>

<MapMarker {lnglat} anchor="center">
	{#if current === key}
		<MapPopup slot="popup">
			<p>{project.title}</p>
		</MapPopup>
	{/if}
	<button class="pin" on:click={toggle} />
</MapMarker>

<style lang="scss">
	.pin {
		width: 1rem;
		height: 1rem;
		background: col(primary, 300);
		border: 3px solid col(bg, 500);
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.15s ease-out;

		&:hover {
			width: 1.5rem;
			height: 1.5rem;
			border: 3px solid col(primary, 500);
		}
	}
</style>
