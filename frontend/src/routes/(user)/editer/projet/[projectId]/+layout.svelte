<script lang="ts">
	import { overlapNavbarStyle } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import EditorNavbar from './EditorNavbar.svelte';
	import EditorToolbar from './EditorToolbar.svelte';
</script>

<article
	data-theme={THEMES.dark}
	use:overlapNavbarStyle={{ theme: THEMES.dark, background: col('bg', 300) }}
	use:setRootBackground={{ overscroll: THEME_PALETTES.dark.bg[300] }}
>
	<EditorNavbar />
	<slot />
	<EditorToolbar />
</article>

<style lang="scss">
	article {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0 0 var(--ui-radius-2xl) var(--ui-radius-2xl);
		background: col(bg, 300);
		color: col(fg, 100);
		margin-top: calc(-1 * var(--ui-nav-h));
		padding-top: var(--ui-nav-h);

		&:global(.rule) {
			background: col(fg, 500);
		}
	}
</style>
