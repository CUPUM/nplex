<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '$components/primitives/Button.svelte';
	import Icon from '$components/primitives/Icon.svelte';
	import Map from '$components/primitives/Map.svelte';
	import MapToolbar from '$components/primitives/MapToolbar.svelte';
</script>

<section>
	<Map let:map innerStyle="width: 100vw; height: 100vh;">
		<MapToolbar slot="top-left">
			<Button on:click={() => map.zoomIn()}><Icon slot="icon" name="plus" /></Button>
			<Button on:click={() => map.zoomOut()}>-</Button>
		</MapToolbar>
		<MapToolbar slot="top-right">
			<Button on:click={() => console.log(map)}>Localize</Button>
			<Button on:click={() => console.log(map)}>Layers</Button>
			<Button on:click={() => console.log(map)}>Full</Button>
			<Button on:click={() => console.log(map)}>Min</Button>
			<Button on:click={() => console.log(map)}>Close</Button>
		</MapToolbar>
	</Map>
</section>

<style lang="postcss">
	section {
		z-index: 0;
		position: relative;
		flex: 1;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
		margin-left: 1rem;
		padding: 0;
		border-radius: 2rem;
		background-color: var(--color-light-300);
		transition: all 0.35s cubic-bezier(0.25, 0, 0.25, 1);
		/* overflow: visible; */
		overflow: hidden;

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
