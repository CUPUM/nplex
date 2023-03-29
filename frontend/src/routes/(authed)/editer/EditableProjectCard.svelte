<script lang="ts">
	import Image from '$components/Image/Image.svelte';
	import MeshGradient from '$components/MeshGradient.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import { projectColors, publicUrl } from '$utils/format';
	import type { LayoutData } from './$types';
	import EditableNewCard from './EditableNewCard.svelte';
	import type { EditablesDefault } from './EditablesList.svelte';

	export let project: Awaited<LayoutData['defer']['editableProjects']>[number] | EditablesDefault;

	const editorHref = `/editer/projet/${project.id}`;
	const explorerHref = `/projets/${project.id}`;
</script>

{#if 'title' in project}
	<div class="project-card project">
		<Ripple />
		<a href={editorHref} class="fill">
			<Image
				class="banner"
				src={publicUrl(STORAGE_BUCKETS.PROJECTS, project.banner?.storage_name)}
				alt="Image-bannière: {project.title}"
			>
				<MeshGradient color={projectColors(project.gallery)} />
			</Image>
		</a>
		<div class="summary">
			<div class="title heading-sm">
				{project.title}
			</div>
			<div class="type">
				{project.type?.title ?? 'Type non défini'}
			</div>
			<div class="works">Travaux...</div>
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
		--card-radius: var(--ui-radius-xl);
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
		transition: all 0.25s var(--ui-ease-out);

		&:hover {
			transform: translateY(-0.5em);

			:global(.banner) {
				transform: scale(1.1);
			}

			.summary {
				opacity: 1;
			}
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
		position: relative;
		opacity: 0.8;
		transform: translateY(0);
		pointer-events: none;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		// background-color: col(bg, 500);
		border-radius: calc(var(--card-radius) - var(--card-inset));

		.title {
			// word-break: break-all;
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
			color: col(fg, 100, 0.8);
			border-radius: 99px;
			background-color: col(fg, 100, 0.1);
		}
	}
</style>
