<script lang="ts">
	import Image from '$components/Image/Image.svelte';
	import ImagePlaceholder from '$components/Image/ImagePlaceholder.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import { projectColors, publicUrl } from '$utils/format';
	import type { LayoutData } from './$types';
	import EditableNewCard from './EditableNewCard.svelte';
	import type { EditablesDefault } from './EditablesList.svelte';

	export let project: LayoutData['projects'][number] | EditablesDefault;

	const editorHref = `/editer/projet/${project.id}`;
	const explorerHref = `/projets/${project.id}`;
</script>

{#if 'title' in project}
	<div class="project-card-outer project">
		<Ripple />
		<a href={editorHref} class="project-fill">
			<Image
				class="banner"
				src={publicUrl(STORAGE_BUCKETS.PROJECTS, project.banner?.name)}
				alt="Image-bannière: {project.title}"
			>
				<ImagePlaceholder color={projectColors(project.gallery)} />
			</Image>
		</a>
		<section>
			<div class="project-title heading-sm">
				{project.title}
			</div>
			<div class="project-type">
				{project.type?.title ?? 'Type non défini'}
			</div>
			<div class="project-works">Travaux...</div>
		</section>
	</div>
{:else}
	<!-- New project card -->
	<a href="/editer/projet" class="project-card-outer">
		<EditableNewCard>Créer un projet</EditableNewCard>
	</a>
{/if}

<style lang="scss">
	.project-card-outer {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 450px;
		aspect-ratio: 3 /4;
		border-radius: var(--ui-radius-lg);
		isolation: isolate;
	}

	.project {
		background: col(bg, 100);
		justify-content: flex-end;

		&:hover {
			section {
				opacity: 1;
				transform: translateY(-0.5em);
			}
		}
	}

	.project-fill {
		z-index: -1;
		position: absolute;
		height: 100%;
		width: 100%;
		border-radius: var(--ui-radius-lg);

		:global(.banner) {
			height: 100%;
		}
	}

	section {
		position: relative;
		opacity: 0.8;
		transform: translateY(0);
		pointer-events: none;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transition: all 0.2s var(--ui-ease-out);

		.project-title {
			// word-break: break-all;
			word-wrap: break-word;
		}

		.project-type {
			pointer-events: none;
			display: inline-flex;
			align-self: flex-start;
			align-items: center;
			padding-bottom: 0.2em;
			padding-inline: 1em;
			height: var(--ui-block-size-md);
			color: col(fg, 100, 0.8);
			border-radius: 99px;
			background-color: col(fg, 100, 0.1);
		}
	}
</style>
