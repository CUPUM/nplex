<script lang="ts">
	import { page } from '$app/stores';
	import { overlapNavbarStyle } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import { col } from '$utils/css';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import type { LayoutData } from './$types';
	import EditorNavbar from './EditorNavbar.svelte';
	import EditorToolbar from './EditorToolbar.svelte';

	$: ({ title } = ($page.data as LayoutData).project);
</script>

<article
	data-theme={THEMES.dark}
	use:overlapNavbarStyle={{ theme: THEMES.dark, background: col('bg', 300) }}
	use:setRootBackground={{ overscroll: THEME_PALETTES.dark.bg[300] }}
>
	<h1>
		<span class="prefix">Projet:</span>
		<span class="title">
			{title} asd asd asd asd as 7g a9sgu asu d asd ad 3qar asd a4ra ar asd asd
		</span>
	</h1>
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

		&:global(.rule) {
			background: col(fg, 500);
		}
	}

	h1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 0.875rem;
		padding: 1rem 1.5rem;
		font-weight: 400;
		max-width: var(--ui-nav-center-w);
		border: 1px solid col(primary, 300, 0.1);
		color: col(primary, 300);
		// background: col(bg, 000);
		border-radius: 99px; //var(--ui-radius-md);
		gap: 0.5em;

		span {
			white-space: nowrap;
			flex: none;
			position: relative;
			display: block;
			top: -0.1em;
		}

		.prefix {
			font-weight: 300;
			opacity: 0.5;
		}

		.title {
			flex: 1;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
</style>
