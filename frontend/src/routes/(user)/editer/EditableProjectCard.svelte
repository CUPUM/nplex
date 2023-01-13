<script lang="ts">
	import Image from '$components/Image.svelte';
	import ImagePlaceholder from '$components/ImagePlaceholder.svelte';
	import { maybeSingle } from '$types/utils';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import { projectcolors, publicurl } from '$utils/format';
	import type { LayoutData } from './$types';
	import { EDITOR_ROUTES } from './common';

	export let project: LayoutData['projects'][number];
</script>

{#if 'title' in project}
	<a href="{EDITOR_ROUTES.project.pathname}/{project.id}">
		<Image
			class="banner"
			src={publicurl(STORAGE_BUCKETS.PROJECTS, maybeSingle(project.banner)?.name)}
			alt="Image-bannière: {project.title}"
		>
			<ImagePlaceholder color={projectcolors(project.gallery)} />
		</Image>
		{project.title}
	</a>
{:else}
	<a class="new" href={EDITOR_ROUTES.project.pathname}> Nouveau projet :D </a>
{/if}

<style lang="scss">
	a {
		display: grid;
		height: 350px;
		aspect-ratio: 2 /3;
	}

	a :global(.banner) {
		border-radius: var(--ui-radius-lg);
	}

	.new {
	}
</style>
