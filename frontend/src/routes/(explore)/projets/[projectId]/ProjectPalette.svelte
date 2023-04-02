<script lang="ts">
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<section>
	<dl id="project-palette">
		{#each project.palette as c}
			<dt class="project-palette-swatch" style:background-color={c.color.toRgbString()} />
		{/each}
	</dl>
</section>

<style lang="scss">
	#project-palette {
		display: flex;
		flex-direction: row;
		gap: 3px;
	}

	.project-palette-swatch {
		font-size: var(--ui-text-3xl);
		height: 1em;
		width: 1em;
		border-radius: 1em;
	}
</style>
