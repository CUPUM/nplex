<script lang="ts">
	import Image from '$components/Image/Image.svelte';
	import ImagePlaceholder from '$components/Image/ImagePlaceholder.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { maybeSingle } from '$types/database/utils';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import { projectColors, publicurl } from '$utils/format';
	import type { LayoutData } from './$types';
	import { EDITOR_ROUTES } from './common';
	import EditableNewCard from './EditableNewCard.svelte';
	import type { EditablesDefault } from './EditablesList.svelte';

	export let project: LayoutData['projects'][number] | EditablesDefault;
</script>

{#if 'title' in project}
	<a class="project" href="{EDITOR_ROUTES.project.pathname}/{project.id}">
		<Ripple />
		<Image
			class="banner"
			src={publicurl(STORAGE_BUCKETS.PROJECTS, maybeSingle(project.banner)?.name)}
			alt="Image-bannière: {project.title}"
		>
			<ImagePlaceholder color={projectColors(project.gallery)} />
		</Image>
		<span>
			{project.title}
		</span>
	</a>
{:else}
	<a href={EDITOR_ROUTES.project.pathname}>
		<EditableNewCard>Créer un projet</EditableNewCard>
	</a>
{/if}

<style lang="scss">
	a {
		position: relative;
		display: grid;
		height: 450px;
		aspect-ratio: 2 /3;
		border-radius: var(--ui-radius-lg);
		isolation: isolate;
	}

	.project {
		background: col(bg, 100);

		:global(.banner) {
			z-index: -1;
			position: absolute;
			border-radius: var(--ui-radius-lg);
		}
	}
</style>
