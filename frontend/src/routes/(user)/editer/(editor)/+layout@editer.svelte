<script lang="ts">
	import { page } from '$app/stores';
	import { overlapNavbarStyle } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import type { LayoutData } from './$types';
	import EditorCrumbs from './EditorCrumbs.svelte';

	$: ({ background, overscroll, theme } = $page.data as LayoutData);
</script>

<article
	data-theme={theme}
	use:overlapNavbarStyle={{ theme, background }}
	use:setRootBackground={{ overscroll }}
	style:--editor-bg={background}
>
	<EditorCrumbs />
	<slot />
</article>

<style lang="scss">
	article {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0 0 var(--ui-radius-2xl) var(--ui-radius-2xl);
		color: col(fg, 100);
		background: var(--editor-bg);
		margin-top: calc(-1 * var(--ui-nav-h));
		padding-bottom: 1.5rem;

		:global(hr) {
			// display: none;
			padding: 0.5px;
			// background: col(fg, 100, 0.1);
			background: col(bg, 900);
			width: 100%;
		}

		:global(.legend) {
			font-size: var(--ui-text-lg);
			font-weight: 450;
			margin-bottom: 1em;
		}

		:global(.editor-section) {
			// display: flex;
			// flex-direction: column;
			padding: 3rem 1.5rem;
			width: 100%;
			max-width: var(--ui-width-md);

			@include laptop {
				padding: 3rem 1.5rem;
				max-width: var(--ui-width-md);
			}
		}
	}
</style>
