<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import ModalConfirmNavigation from '$components/Modal/ModalConfirmNavigation.svelte';
	import { editorDirty, EDITOR_FORM_ID } from './common';

	let submitting = false;
</script>

<ModalConfirmNavigation intercept={$editorDirty} let:confirm let:cancel>
	Vous avez des données non enregistrées. Celles-ci seront perdues si vous changez de page sans
	sauvegarder vos modifications.
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
</style>
