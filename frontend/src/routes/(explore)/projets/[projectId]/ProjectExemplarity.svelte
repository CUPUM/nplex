<script lang="ts">
	import Token from '$components/Token/Token.svelte';
	import TokenIcon from '$components/Token/TokenIcon.svelte';
	import { col } from '$utils/css';
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<section class="project-section">
	<h2 class="project-section-title">Indicateurs d’exemplarité</h2>
	<ul>
		{#each project.exemplarityIndicators as indicator}
			<li>
				<Token --token-color={col('primary', 700)} --token-background={col('primary', 100, 0.2)}>
					<TokenIcon name="star" strokeWidth={2.5} />
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
		font-size: var(--ui-text-sm);
		font-weight: 425;
	}
</style>
