<script lang="ts">
	import Map from '$components/Map/Map.svelte';
	import MapDraw from '$components/Map/MapDraw.svelte';
	import { DRAW_MODES } from '$utils/enums';
	import type { ComponentProps } from 'svelte';

	let draw: ComponentProps<MapDraw>['draw'];

	function toggleMode(e: any) {
		if (draw?.getMode() == DRAW_MODES.DrawCircle) {
			draw.changeMode('simple_select');
			return;
		}
		draw?.changeMode(DRAW_MODES.DrawCircle);
	}
</script>

<article>
	<section>
		<Map>
			<MapDraw bind:draw mode={DRAW_MODES.DrawCircle} />
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
