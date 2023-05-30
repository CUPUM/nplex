<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import Switch from '$components/Switch/Switch.svelte';
	import SwitchItem from '$components/Switch/SwitchItem.svelte';
	import { getProjectImageUrl } from '$utils/database/helpers';
	import { galleryLayouts, getProjectContext } from './common';

	export let layout: (typeof galleryLayouts)[number]['layout'];

	const project = getProjectContext();
</script>

<section>
	<hgroup>
		<h2 class="project-section-title">Galerie</h2>
		<Switch class="text-sm" compact variant="outlined" bind:value={layout}>
			{#each galleryLayouts as l}
				<SwitchItem value={l.layout} equi>
					<Icon name={l.icon} />
				</SwitchItem>
			{/each}
		</Switch>
	</hgroup>
	<ol>
		{#each project.gallery as img}
			<li>
				<img src={getProjectImageUrl(img.storage_name)} alt={img.title} />
			</li>
		{/each}
	</ol>
</section>

<style lang="scss">
	section {
		width: 100%;
	}

	hgroup {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	ol {
		columns: 3 250px;
		column-gap: var(--ui-gutter-xs);
		column-fill: balance;
		line-height: 0;
	}

	li {
		position: relative;
		width: 100%;
		display: inline-block;
		text-align: center;
		margin-bottom: var(--ui-gutter-xs);
		// break-before: column;
	}

	img {
		border-radius: var(--ui-radius-xl);
	}
</style>
