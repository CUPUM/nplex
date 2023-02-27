<script lang="ts">
	import { NAVBAR_WIDTH, overlapNavbar } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import { THEMES, THEME_PALETTES } from '$utils/themes';

	let background = THEME_PALETTES.dark.bg[300];
</script>

<article
	data-theme={THEMES.dark}
	use:overlapNavbar={{ theme: THEMES.dark, background, width: NAVBAR_WIDTH.Full }}
	use:setRootBackground={{ overscroll: background }}
	style:--editor-bg={background}
>
	<slot />
</article>

<style lang="scss">
	article {
		--article-radius: var(--ui-radius-xl);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0 0 var(--article-radius) var(--article-radius);
		color: col(fg, 100);
		background: var(--editor-bg);
		margin-top: calc(-1 * var(--ui-nav-h));
		min-height: 100vh;
		padding: 1.5rem;
		padding-top: 0;

		@include mobile {
			padding: 0.75rem;
			font-size: var(--ui-text-sm);
		}
	}
</style>
