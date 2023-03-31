<script lang="ts">
	import type { Colord } from 'colord';

	export let palette: Colord[];
</script>

<section>
	<h2 class="heading-lg">Palette de couleurs</h2>
	<dl id="project-palette">
		{#each palette as c}
			<dt class="project-palette-swatch" />
		{/each}
	</dl>
</section>

<style lang="scss">
	#project-palette {
		display: flex;
		flex-direction: row;
		gap: var(--ui-gap-md);
	}

	.project-palette-swatch {
	}
</style>
