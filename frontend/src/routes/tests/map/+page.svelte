<script lang="ts">
	import Map from '$components/Map/Map.svelte';
	import MapDraw from '$components/Map/MapDraw.svelte';
	import type { ComponentProps } from 'svelte';

	let draw: ComponentProps<MapDraw>['draw'];

	function toggleMode(e: any) {
		if (draw?.getMode() == 'draw_points') {
			draw.changeMode('simple_select');
			return;
		}
		draw?.changeMode('draw_points', { max: 5 });
	}
</script>

<article>
	<section>
		<Map>
			<MapDraw bind:draw />
		</Map>
	</section>
	<button class="ui-button" on:pointerdown={toggleMode}><span class="ui-text">Draw!</span></button>
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
