<script lang="ts">
	import Image from '$components/Image.svelte';
	import { projectcolors, publicurl } from '$utils/database';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import { EDITOR_ROUTES } from '$utils/routes';
	import type { LayoutData } from './$types';
	import type { EDITABLES_NEW } from './EditablesList.svelte';

	export let project: LayoutData['projects'][number] | typeof EDITABLES_NEW;
</script>

{#if 'title' in project}
	<a href="{EDITOR_ROUTES.project.pathname}/{project.id}">
		<Image
			class="banner"
			src={publicurl(STORAGE_BUCKETS.PROJECTS, project.banner?.name)}
			alt="Image-bannière: {project.title}"
			color={projectcolors(project.gallery)}
		/>
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
