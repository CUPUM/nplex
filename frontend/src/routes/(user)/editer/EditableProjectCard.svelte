<script lang="ts">
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import Image from '$components/Image/Image.svelte';
	import ImagePlaceholder from '$components/Image/ImagePlaceholder.svelte';
	import { maybeSingle } from '$types/utils';
	import { STORAGE_BUCKETS } from '$utils/enums';
	import { projectColors, publicurl } from '$utils/format';
	import type { LayoutData } from './$types';
	import { EDITOR_ROUTES } from './common';
	import type { EditablesDefault } from './EditablesList.svelte';

	export let project: LayoutData['projects'][number] | EditablesDefault;
</script>

{#if 'title' in project}
	<a href="{EDITOR_ROUTES.project.pathname}/{project.id}">
		<Image
			class="banner"
			src={publicurl(STORAGE_BUCKETS.PROJECTS, maybeSingle(project.banner)?.name)}
			alt="Image-bannière: {project.title}"
		>
			<ImagePlaceholder color={projectColors(project.gallery)} />
		</Image>
		{project.title}
	</a>
{:else}
	<a class="new {ICON_CLASS.hover}" href={EDITOR_ROUTES.project.pathname}>
		<span>Créer un projet</span>
		<Icon name="pen-plus" strokeWidth={1.25} class="i" />
	</a>
{/if}

<style lang="scss">
	a {
		display: grid;
		height: 450px;
		aspect-ratio: 2 /3;
		background: col(fg, 100, 0.1);
		border-radius: var(--ui-radius-lg);
	}

	a :global(.banner) {
		border-radius: var(--ui-radius-lg);
	}

	.new {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		background: transparent;
		color: col(fg, 100, 0.2);
		border: 1px dashed col(fg, 100, 0.1);
		transition: all 0.2s;

		&:hover {
			color: col(primary, 700);
			border: 1px dashed transparent;
			background: col(primary, 100, 0.1);
		}

		span {
			text-align: center;
			font-weight: 400;
		}

		:global(.i) {
			font-size: 2rem;
		}
	}
</style>
