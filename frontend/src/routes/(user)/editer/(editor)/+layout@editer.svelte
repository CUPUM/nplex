<script lang="ts">
	import { overlapNavbarStyle } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import type { LayoutData } from './$types';
	import EditorCrumbs from './EditorCrumbs.svelte';

	export let data: LayoutData;
</script>

<article
	data-theme={data.theme}
	use:overlapNavbarStyle={{ theme: data.theme, background: data.background }}
	use:setRootBackground={{ overscroll: data.overscroll }}
>
	<EditorCrumbs />
	<slot />
	<!-- <EditorToolbar /> -->
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
</style>
