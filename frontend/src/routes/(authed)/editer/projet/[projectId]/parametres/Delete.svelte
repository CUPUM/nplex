<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';

	let opened = false;
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Supprimer</h3>
	<p class="subtle">Attention, les projets supprimés ne peuvent pas être récupérés.</p>
	<Modal bind:opened>
		<svelte:fragment slot="control" let:requestConfirmation>
			<fieldset class="delete">
				<Button
					variant="cta"
					state="warning"
					type="submit"
					formaction="?/delete"
					on:click={requestConfirmation}
				>
					<Icon name="trash" slot="leading" />Supprimer le projet
				</Button>
			</fieldset>
		</svelte:fragment>
		<svelte:fragment slot="header" />
		<p>Voulez-vous vraiment supprimer ce projet?</p>
		<p>
			Si oui, entrez le nom du projet, <q>
				{'test'}
				<q>, ci-dessous afin débarrer l'option.</q>
			</q>
		</p>
		<svelte:fragment slot="footer">
			<Button variant="cta" state="warning">Supprimer</Button>
		</svelte:fragment>
	</Modal>
</fieldset>

<style lang="scss">
	.delete {
		font-size: var(--ui-text-sm);
	}
</style>
