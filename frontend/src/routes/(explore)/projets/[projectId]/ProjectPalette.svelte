<script lang="ts">
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<section class="project-section">
	<h2 class="project-section-title">Palette</h2>
	<dl id="project-palette">
		{#each project.palette.sort((a, b) => (a.type === 'dominant' ? -1 : 1)) as c}
			<dt class="project-palette-swatch" style:background-color={c.color.toRgbString()} />
		{/each}
	</dl>
</section>

<style lang="scss">
	.project-section {
		// background-color: col(bg, 100) !important;
	}

	#project-palette {
		display: flex;
		flex-direction: row;
		gap: 3px;
	}

	.project-palette-swatch {
		font-size: var(--ui-text-3xl);
		height: 1em;
		width: 1em;
		border-radius: 0.25em;
	}
</style>
