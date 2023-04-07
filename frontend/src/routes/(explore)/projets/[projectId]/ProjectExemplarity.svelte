<script lang="ts">
	import Token from '$components/Token/Token.svelte';
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<section>
	<h2 class="project-section-title">Indicateurs d’exemplarité</h2>
	<ul>
		{#each project.exemplarityIndicators as indicator}
			<li>
				<Token>
					{indicator.title}
				</Token>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	ul {
		--spacing: 6px;
	}

	li {
		display: inline-block;
		margin-inline-end: var(--spacing);
		margin-block-end: var(--spacing);
	}
</style>
