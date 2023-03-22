<script lang="ts">
	import { NAVBAR_WIDTH, overlapNavbar } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import EditorNavigationModal from './EditorNavigationModal.svelte';
	import EditorToolbar from './EditorToolbar.svelte';

	let background = THEME_PALETTES.dark.bg[500];
</script>

<article
	data-theme={THEMES.dark}
	use:overlapNavbar={{ theme: THEMES.dark, background, width: NAVBAR_WIDTH.Full }}
	use:setRootBackground={{ overscroll: background }}
	style:--editor-bg={background}
>
	<slot />
	<EditorToolbar />
	<EditorNavigationModal />
</article>

<style lang="scss">
	article {
		--article-radius: min(var(--ui-radius-2xl), calc(0.1 * var(--ui-scroll-px)));
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0 0 var(--article-radius) var(--article-radius);
		color: col(fg, 100);
		background: var(--editor-bg);
		margin-top: calc(-1 * var(--ui-nav-h));
		min-height: 100vh;
		padding: var(--ui-pad-outer);
		padding-top: 0;

		@include mobile {
			padding: 0.75rem;
			padding-top: 0;
			font-size: var(--ui-text-sm);
		}

		:global(.editor-tab-header) {
			padding: var(--ui-pad-outer);
			// border: var(--ui-border-thickness) dashed col(fg, 100, 0.1);
			background-color: col(secondary, 100);
			// color: col(secondary, 900);
			border-radius: var(--ui-radius-xl);
		}

		:global(.editor-formgroup) {
			position: relative;
			padding: 3rem;
			background-color: col(bg, 700);
			// border: 1px solid col(bg, 900);
			border-radius: var(--ui-radius-xl);
			// box-shadow: var(--ui-shadow-md);
		}

		:global(.editor-formgroup-stack) {
			display: flex;
			flex-direction: column;
			gap: 3rem;
		}

		:global(.editor-formgroup-title) {
			@include typography(heading, md);
			margin-top: -0.25em;
			margin-bottom: 2rem;
		}
	}
</style>
