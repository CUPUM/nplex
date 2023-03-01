<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import ModalConfirmNavigation from '$components/Modal/ModalConfirmNavigation.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import type { LayoutData } from './$types';
	import { editorIsDirty, EDITOR_FORM_ID } from './common';
	import EditorCrumbs from './EditorCrumbs.svelte';
	import EditorHeader from './EditorHeader.svelte';
	import EditorToolbar from './EditorToolbar.svelte';

	let submitting = false;

	$: ({ crumbs } = $page.data as LayoutData);
</script>

<EditorCrumbs {crumbs} />
<EditorHeader>
	<slot name="header" />
</EditorHeader>
<div class="columns">
	<Sidebar>
		<slot name="sidebar" />
	</Sidebar>
	<article>
		<slot />
	</article>
</div>
<!-- Bottom toolbar -->
<EditorToolbar />
<!-- Unsaved data warning -->
<ModalConfirmNavigation intercept={$editorIsDirty} let:confirm let:cancel>
	Vous avez des données non enregistrées. Celles-ci seront perdues si vous changez de page sans les
	sauvegarder.
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

<style lang="scss">
	.columns {
		width: 100%;
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		gap: 1.5rem;
		padding-top: 1.5rem;

		@include tablet {
			gap: 0;
		}
	}

	article {
		flex: 1;
	}
</style>
