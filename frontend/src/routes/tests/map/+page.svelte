<script lang="ts">
	import Map from '$components/Map/Map.svelte';
	import MapDraw from '$components/Map/MapDraw.svelte';
	import type { ComponentProps } from 'svelte';

	let draw: ComponentProps<MapDraw>['draw'];

	function setMode(e: any) {
		console.log(draw?.getMode());
	}
</script>

<article>
	<section>
		<Map>
			<MapDraw bind:draw mode="multi_point" />
		</Map>
	</section>
	<button class="ui-button" on:pointerdown={setMode}><span class="ui-text">Draw!</span></button>
</article>

<style lang="scss">
	article {
		position: relative;
		height: 1400px;
		width: 800px;
	}

	section {
		height: 500px;
		width: 100%;
	}
</style>
