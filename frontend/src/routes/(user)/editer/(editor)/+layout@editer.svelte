<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import ModalConfirmNavigation from '$components/Modal/ModalConfirmNavigation.svelte';
	import { NAVBAR_WIDTH, overlapNavbar } from '$routes/Navbar.svelte';
	import { setRootBackground } from '$routes/RootBackground.svelte';
	import { THEMES, THEME_PALETTES } from '$utils/themes';
	import { cubicOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { editorDirty, EDITOR_FORM_ACTION, EDITOR_FORM_ID } from './common';

	// $: ({ background, overscroll, theme } = $page.data as LayoutData);

	let background = THEME_PALETTES.dark.bg[500];

	let submitting = false;

	$: if ($page.form) {
		submitting = false;
	}

	$: dirty = !!Object.values($editorDirty).filter((v) => v).length;
</script>

<article
	data-theme={THEMES.dark}
	use:overlapNavbar={{ theme: THEMES.dark, background, width: NAVBAR_WIDTH.Full }}
	use:setRootBackground={{ overscroll: background }}
	style:--editor-bg={background}
>
	<slot />
	<!-- Bottom toolbar -->
	<menu>
		{#if dirty}
			<div
				in:fly={{ y: 6, duration: 200, easing: cubicOut }}
				out:scale|local={{ start: 0.95, duration: 200 }}
			>
				<Button
					variant="cta"
					type="submit"
					form={EDITOR_FORM_ID}
					formaction="?/{EDITOR_FORM_ACTION}"
				>
					Sauvegarder
					<Icon name="save" slot="trailing" />
				</Button>
			</div>
		{/if}
	</menu>
	<!-- Unsaved data warning -->
	<ModalConfirmNavigation intercept={dirty} let:confirm let:cancel>
		Vous avez des données non enregistrées. Celles-ci seront perdues si vous changez de page sans
		les sauvegarder.
		<svelte:fragment slot="footer">
			<Button variant="ghost" on:click={confirm}>Continuer sans sauvegarder</Button>
			<Button variant="ghost" on:click={cancel}>Annuler</Button>
			<Button
				variant="cta"
				type="submit"
				on:click={() => {
					submitting = true;
				}}
				form={EDITOR_FORM_ID}
				loading={submitting}
			>
				Sauvegarder et continuer
			</Button>
		</svelte:fragment>
	</ModalConfirmNavigation>
</article>

<style lang="scss">
	article {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		border-radius: 0 0 var(--ui-radius-xl) var(--ui-radius-xl);
		color: col(fg, 100);
		background: var(--editor-bg);
		margin-top: calc(-1 * var(--ui-nav-h));
		min-height: 100vh;
	}

	menu {
		width: 100%;
		position: sticky;
		padding-inline: 1.5rem;
		margin-bottom: 1.5rem;
		bottom: 1.5rem;
		align-self: center;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		flex-direction: row;
		height: 0;
	}
</style>
