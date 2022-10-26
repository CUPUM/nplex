<script lang="ts" context="module">
</script>

<script lang="ts">
	import Map from '$components/Map.svelte';
	import MapToolbar from '$components/MapToolbar.svelte';
</script>

<section>
	<Map let:map innerStyle="width: 100vw; height: 100vh;">
		<MapToolbar slot="top-left" position="top-left">
			<!-- <Button variant="ghost" on:click={() => map.zoomIn()} icon="plus" /> -->
			<!-- <Button variant="ghost" on:click={() => map.zoomOut()} icon="minus" /> -->
		</MapToolbar>
		<MapToolbar slot="top-right" position="top-right">
			<!-- <Button variant="ghost" on:click={() => centerMapOnClientLocation(map)} icon="localize" /> -->
			<!-- <Button variant="ghost" on:click={() => console.log(map)} icon="layers" />
			<Button variant="ghost" on:click={() => console.log(map)} icon="expand" />
			<Button variant="ghost" on:click={() => console.log(map)} icon="cross" /> -->
		</MapToolbar>
	</Map>
</section>

<style lang="scss">
	section {
		z-index: 0;
		position: relative;
		flex: 1;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
		margin-left: 1rem;
		padding: 0;
		border-radius: 1.5rem;
		background-color: var(--color-light-300);
		transition: all 0.35s cubic-bezier(0.25, 0, 0.25, 1);
		/* overflow: visible; */
		// overflow: hidden;

		&:first-child:not(.is-article) {
		}

		&:last-child:not(.is-article) {
			margin-right: 1rem;
		}

		&.is-article {
			margin: 0 1rem;
			padding: 0;
			pointer-events: none;
		}
	}
</style>
