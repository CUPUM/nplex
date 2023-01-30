<script lang="ts">
	import { overlapNavbarStyle } from '$routes/Navbar.svelte';
	import RootBackground, { setRootBackground } from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import { THEME_PALETTES } from '$utils/themes';
	import type { LayoutData } from './$types';
	import { formProject, STARTID } from './common';
	import Header from './Header.svelte';
	import Menu from './Menu.svelte';

	export let data: LayoutData;

	$: formProject.set({ ...data.project });
</script>

<RootBackground body={col('bg', '900')} />
<Header {data} />
<article
	use:overlapNavbarStyle={{ background: col('bg', '100') }}
	use:setRootBackground={{ overscroll: THEME_PALETTES.light.bg[100] }}
	id={STARTID}
>
	<slot />
	<Menu />
</article>

<style lang="scss">
	article {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: col(bg, 100);
		border-radius: var(--ui-radius-xl);
		padding-bottom: 2rem;
		scroll-margin-top: calc(var(--ui-nav-px) - 0.5rem);
		min-height: 100vh;
		color: col(fg, 000);
	}

	:global(.formgroup) {
		align-self: center;
		margin: 0 auto;
		position: relative;
		align-self: center;
		width: 100%;
		max-width: var(--ui-width-main);
		display: grid;
		grid-template-columns:
			[full-start legend-start]
			1fr
			[legend-end section-start]
			3fr
			[section-end full-end];
		align-items: flex-start;
		gap: 3rem;
		padding: 3rem 2.5rem;

		@include laptop {
			padding: 1.5rem;
		}
	}

	:global(.formgroup-legend) {
		// z-index: 1;
		color: col(primary, 300);
		grid-column: legend;
		position: sticky;
		top: var(--ui-nav-px);
		float: left; // Required to clear outset by vendor styling.
		font-size: var(--ui-text-xl);
		font-weight: 550;
		padding: 0;
		line-height: 1.5;
	}

	:global(.formgroup-fields) {
		grid-column: section;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: flex-start;
	}
</style>
