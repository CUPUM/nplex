<script lang="ts">
	import RootBackground from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import type { LayoutData } from './$types';
	import { formProject, STARTID } from './common';
	import Header from './Header.svelte';
	import Menu from './Menu.svelte';

	export let data: LayoutData;

	$: formProject.set({ ...data.project });
</script>

<!-- <RootTheme theme="dark" /> -->
<RootBackground body={col('bg', '900')} duration={750} />
<Header {data} />
<article id={STARTID}>
	<slot />
	<Menu />
</article>

<style lang="scss">
	article {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;

		:global(:where(.editor-legend)) {
			z-index: 1;
			color: col(fg, 500);
			grid-column: legend;
			position: sticky;
			top: var(--ui-nav-px);
			float: left; // Required to clear outset by vendor styling.
			font-size: var(--ui-text-xl);
			font-weight: 550;
			padding: 0;
			// padding-left: 0.5em;
			line-height: 1.5;
		}
	}
</style>
