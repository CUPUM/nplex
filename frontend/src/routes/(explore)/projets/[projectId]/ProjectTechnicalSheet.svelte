<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { getProjectContext } from './common';

	const project = getProjectContext();
</script>

<section id="project-tags">
	<!-- <h2 class="project-section-title">Résumé technique</h2> -->
	<dl class="chip-groups-list">
		<div class="chip-group">
			<dt class="chip-group-title">Type de projet</dt>
			<div class="chip-group-inner">
				<dd class="chip">
					<div class="chip-inner">
						{project.type.title}
					</div>
				</dd>
			</div>
		</div>
		<div class="chip-group">
			<dt class="chip-group-title">Type de propriétaire</dt>
			<div class="chip-group-inner">
				<dd class="chip">
					<div class="chip-inner">
						{project.site_ownership.title}
					</div>
				</dd>
			</div>
		</div>
		<div
			class="chip-group"
			style:--chip-color={project.bannerColors.dominant
				.darken(project.bannerColors.dominant.brightness() - 0.1)
				.toRgbString()}
			style:--chip-bg={project.bannerColors.dominant.darken(0.5).alpha(0.1).toRgbString()}
		>
			<dt class="chip-group-title">Intervention{project.interventions.length > 1 ? 's' : ''}</dt>
			<div class="chip-group-inner">
				{#each project.interventions as itv}
					<dd class="chip">
						<div class="chip-inner">
							{itv.title}
						</div>
						<button class="chip-button">
							<Icon name="question" />
						</button>
					</dd>
				{/each}
			</div>
		</div>
		<!-- <div
			class="chip-group"
			style:--chip-color={col('primary', 700)}
			style:--chip-bg={col('primary', 300, 0.1)}
		>
			<dt class="chip-group-title">
				Indicateurs d'exemplarité{project.interventions.length > 1 ? 's' : ''}
			</dt>
			<div class="chip-group-inner">
				{#each project.exemplarityIndicators as indicator}
					<dd class="chip">
						<div class="chip-inner">
							{indicator.title}
						</div>
					</dd>
				{/each}
			</div>
		</div> -->
	</dl>
</section>

<style lang="scss">
	#project-tags {
		padding: var(--ui-pad-lg);
		// border: 1px solid var(--bg-color);
		background-color: col(bg, 000);
		border-radius: var(--ui-radius-xl);
	}

	.chip-groups-list {
		display: flex;
		flex-direction: row;
		gap: var(--ui-gap-md);
		flex-wrap: wrap;
	}

	.chip-group {
		display: flex;
		flex-direction: column;
		gap: var(--ui-gap-sm);
		align-items: flex-start;
		flex-grow: 0;
	}

	.chip-group-title {
		@include typography(text, sm);
		margin-inline-start: 0.5em;
		// &::after {
		// 	content: ' : ';
		// }
	}

	.chip-group-inner {
		display: flex;
		flex-direction: row;
		gap: 0.25em;
		flex-wrap: wrap;
	}

	.chip-button {
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 99px;
		background-color: var(--chip-bg);
		height: 100%;
		opacity: 0.5;
	}

	.chip {
		--chip-inset: var(--ui-inset-md);
		height: var(--ui-block-md);
		display: inline-flex;
		padding: var(--chip-inset);
		align-items: center;
		flex-direction: row;
		background-color: var(--chip-bg, col(fg, 100, 0.1));
		// border: 1px solid var(--chip-bg);
		color: var(--chip-color, col(fg, 100));
		border-radius: 99px;

		.chip-inner {
			padding-inline: calc(var(--ui-pad-md) - var(--chip-inset));
			position: relative;
			top: -0.1em;
			white-space: nowrap;
		}
	}
</style>
