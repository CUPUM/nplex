<script lang="ts">
	import Map from '$components/Map/Map.svelte';
	import MapDraw from '$components/Map/MapDraw.svelte';
	import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
	import { DRAW_MODES } from '$utils/enums';
	import style from '$utils/map/styles/tonerLight';
	import type { ComponentProps } from 'svelte';

	let draw: ComponentProps<MapDraw>['draw'];

	function toggleMode(e: any) {
		if (draw?.getMode() == DRAW_MODES.DrawCircle) {
			draw.changeMode('simple_select');
			return;
		}
		draw?.changeMode(DRAW_MODES.DrawCircle);
	}

	console.log(PUBLIC_MAPTILER_KEY);
</script>

<article>
	<section>
		<Map {style}>
			<MapDraw bind:draw mode={DRAW_MODES.DrawPoint} />
		</Map>
	</section>
	<button class="ui-button" on:pointerdown={toggleMode}><span class="ui-text">Draw!</span></button>
</article>

<style lang="scss">
	article {
		position: relative;
		width: 800px;
		background: col(bg, 900);
		padding: 5rem;
	}

	section {
		height: 500px;
		width: 100%;
	}
</style>
