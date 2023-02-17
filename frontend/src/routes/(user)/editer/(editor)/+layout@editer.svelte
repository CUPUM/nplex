<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { NAVBAR_WIDTH, overlapNavbar } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import type { LayoutData } from './$types';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from './common';
	import EditorCrumbs from './EditorCrumbs.svelte';
	import EditorSidebar from './EditorSidebar.svelte';
	import EditorToolbar from './EditorToolbar.svelte';

	$: ({ background, overscroll, theme } = $page.data as LayoutData);
</script>

<article
	data-theme={theme}
	use:overlapNavbar={{ theme, background, width: NAVBAR_WIDTH.Full }}
	use:setRootBackground={{ overscroll }}
	style:--editor-bg={background}
>
	<EditorCrumbs />
	<section>
		<EditorSidebar />
		<form
			id={EDITOR_FORM_ID}
			method="POST"
			action="?/{EDITOR_FORM_ACTION}"
			use:enhance={({ form, data, action, cancel }) => {
				return async ({ update, result }) => {
					update({ reset: false });
				};
			}}
		>
			<slot />
			<EditorToolbar />
		</form>
	</section>
</article>

<style lang="scss">
	article {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 0 0 var(--ui-radius-xl) var(--ui-radius-xl);
		color: col(fg, 100);
		background: var(--editor-bg);
		margin-top: calc(-1 * var(--ui-nav-h));
		min-height: 100vh;
	}

	section {
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
	}

	form {
		flex: 1;
		align-self: stretch;

		@include tablet {
			// width: 100%;
			// flex: none;
		}

		&:not(:first-child) {
			border-left: 1px solid col(fg, 500, 0.05);
		}

		:global(hr) {
			padding: 0.5px;
			background: col(bg, 900);
			width: 100%;
		}

		:global(.legend) {
			font-size: var(--ui-text-lg);
			font-weight: 450;
			margin-bottom: 1em;
		}

		:global(.editor-section) {
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
