<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import ModalConfirmNavigation from '$components/Modal/ModalConfirmNavigation.svelte';
	import { NAVBAR_WIDTH, overlapNavbar } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import { editorDirty } from './common';
	import EditorToolbar from './EditorToolbar.svelte';

	// $: ({ background, overscroll, theme } = $page.data as LayoutData);

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
	<Modal opened>
		<svelte:fragment slot="header">Hello</svelte:fragment>
		<ul>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
			<li>Yeehaw</li>
		</ul>
		<svelte:fragment slot="footer">Hello</svelte:fragment>
	</Modal>
	<ModalConfirmNavigation
		intercept={Object.values($editorDirty).filter((v) => v).length > 0}
		let:confirm
		let:cancel
	>
		Hello!
		<Button>Sauvegarder et continuer</Button>
		<Button>Continuer sans sauvegarder</Button>
		<Button on:click={cancel}>Annuler</Button>
	</ModalConfirmNavigation>
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
</style>
