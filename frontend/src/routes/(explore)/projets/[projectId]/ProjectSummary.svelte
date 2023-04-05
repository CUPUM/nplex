<script lang="ts">
	import RenderMarkdown from '$components/RenderMarkdown.svelte';
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<section>
	<!-- <h2 class="project-section-title">Présentation du projet</h2> -->
	<div class="content">
		<RenderMarkdown source={project.description} />
	</div>
</section>

<style lang="scss">
	section {
		width: 100%;
	}

	.content {
		width: auto;
		margin: 0 auto;
		width: 100%;
		padding-block: var(--ui-gutter-lg);
		// font-size: var(--ui-text-lg);
		// font-weight: 300;
		line-height: 1.75;
		border-radius: var(--ui-radius-xl);
		background-color: col(bg, 000);
		// border: 1px solid var(--bg-color);

		:global(p) {
			margin-inline: auto;
		}
	}
</style>
