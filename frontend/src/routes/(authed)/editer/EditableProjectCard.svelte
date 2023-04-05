<script lang="ts">
	import Image from '$components/Image/Image.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import { publicUrl } from '$utils/format';
	import type { LayoutData } from './$types';
	import EditableNewCard from './EditableNewCard.svelte';
	import type { EditablesDefault } from './EditablesList.svelte';

	export let project: Awaited<LayoutData['defer']['editableProjects']>[number] | EditablesDefault;

	const editorHref = `/editer/projet/${project.id}`;
	const explorerHref = `/projets/${project.id}`;
</script>

{#if 'title' in project}
	<!-- {@const bgColor = project.banner
		? colord(pgCubeToHsl(project.banner?.color_average_hsl))
				.desaturate(0.3)
				.lighten(-0.4)
				.toRgbString()
		: col('bg', 900)} -->
	<div class="project-card project" class:published={project.publication_status.published}>
		<Ripple />
		<a href={editorHref} class="fill">
			<Image
				class="banner"
				src={publicUrl(STORAGE_BUCKETS.PROJECTS, project.banner?.storage_name)}
				alt="Image-bannière: {project.title}"
			>
				<!-- <MeshGradient color={projectColors(project.gallery)} /> -->
			</Image>
		</a>
		<div class="summary">
			<div class="status">
				{project.publication_status.published ? 'Publié' : 'Non-publié'}
			</div>
			<div class="title">
				{project.title}
			</div>
			<div class="type">
				{project.type?.title ?? 'Type non défini'}
			</div>
			<div class="works">
				{#each project.interventions as intervention}
					<div class="intervention">
						{intervention.title}
					</div>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<!-- New project card -->
	<a href="/editer/projet" class="project-card">
		<EditableNewCard>Créer un projet</EditableNewCard>
	</a>
{/if}

<style lang="scss">
	.project-card {
		--card-inset: 6px;
		--card-radius: var(--ui-radius-lg);
		position: relative;
		display: flex;
		flex-direction: column;
		height: 450px;
		aspect-ratio: 3 /4;
		border-radius: var(--card-radius);
		isolation: isolate;
		overflow: hidden;
	}

	.project {
		background: col(bg, 900);
		justify-content: flex-end;
		transition: all 0.3s var(--ui-ease-out);

		&:hover {
			box-shadow: var(--ui-shadow-lg);
			transform: translateY(-0.25em);

			:global(.banner) {
				transform: scale(1.05);
			}

			.summary {
				opacity: 1;
			}
		}
	}

	.status {
		display: inline-flex;
		align-self: flex-start;
		align-items: center;
		padding-inline: var(--ui-pad-md);
		height: var(--ui-block-md);
		border-radius: 99px;
		padding-bottom: 0.2em;
		color: col(notice, 900);
		background-color: col(notice, 100, 0.2);
		font-size: var(--ui-text-sm);
		// backdrop-filter: blur(8px);

		.published & {
			color: col(primary, 900);
			background-color: col(primary, 100, 0.2);
		}
	}

	.fill {
		z-index: -1;
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		border-radius: inherit;

		:global(.banner) {
			height: 100%;
			transform: scale(1);
			transition: all 0.25s var(--ui-ease-out);
		}
	}

	.summary {
		position: absolute;
		inset: 0;
		z-index: 1;
		transform: translateY(0);
		pointer-events: none;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-radius: calc(var(--card-radius) - var(--card-inset));
		// background-color: col(bg, 500);

		&::after {
			z-index: -1;
			position: absolute;
			content: '';
			inset: 0;
			background: linear-gradient(var(--bg-color, col(bg, 900)) 0%, transparent 75%);
		}

		.title {
			font-size: var(--ui-text-lg);
			font-weight: 450;
			line-height: 1.25;
			color: col(fg, 300);
			word-wrap: break-word;
		}

		.type {
			pointer-events: none;
			display: inline-flex;
			align-self: flex-start;
			align-items: center;
			padding-bottom: 0.2em;
			padding-inline: 1em;
			height: var(--ui-block-md);
			font-size: var(--ui-text-sm);
			color: col(fg, 100, 0.8);
			// backdrop-filter: blur(8px);
			border-radius: 99px;
			background-color: col(fg, 100, 0.1);
		}
	}
</style>
