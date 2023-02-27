<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import ModalConfirmNavigation from '$components/Modal/ModalConfirmNavigation.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import type { ComponentProps } from 'svelte';
	import { editorIsDirty, EDITOR_FORM_ID } from './common';
	import EditorHeader from './EditorHeader.svelte';
	import EditorToolbar from './EditorToolbar.svelte';

	export let crumbs: ComponentProps<EditorHeader>['crumbs'];

	let submitting = false;
</script>

<EditorHeader {crumbs} />
<hgroup>
	<slot name="header" />
</hgroup>
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

		@include tablet {
			gap: 0;
		}
	}
</style>
