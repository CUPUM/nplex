<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import { complements, composeSectionHref, essentials, settings } from './common';

	const links = [...essentials, ...complements, settings];

	$: current = links.findIndex(
		(link) =>
			composeSectionHref($page.params.projectId, link.subpath, link.hash) ===
			$page.url.pathname + $page.url.hash
	);

	$: next = links[current + 1];
	$: prev = links[current - 1];
</script>

<nav>
	{#if prev}
		<Button
			variant="outlined"
			style="grid-area: prev"
			rounded
			href={composeSectionHref($page.params.projectId, prev.subpath, prev.hash)}
		>
			<Icon name="arrow-left" slot="leading" />
			<span class="subtle">Section précédente&thinsp;:&ensp;</span>
			{prev.title}
		</Button>
	{/if}
	{#if next}
		<Button
			variant="outlined"
			style="grid-area: next"
			rounded
			href={composeSectionHref($page.params.projectId, next.subpath, next.hash)}
		>
			<span class="subtle">Section suivante&thinsp;:&ensp;</span>
			{next.title}
			<Icon name="arrow-right" slot="trailing" />
		</Button>
	{/if}
</nav>

<style lang="scss">
	nav {
		display: grid;
		grid-template-areas: 'prev next';
		justify-content: space-between;
	}
</style>
