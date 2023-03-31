<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';

	export let confirm: string;

	let answer = '';
	let opened = false;

	$: valid = confirm;
</script>

<fieldset class="editor-form-group">
	<h3 class="editor-form-group-title">Supprimer</h3>
	<p class="subtle">Attention, les projets supprimés ne peuvent pas être récupérés.</p>
	<Modal bind:opened>
		<svelte:fragment slot="control" let:requestConfirmation>
			<fieldset class="text-sm">
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
			Si oui, entrez <q>{confirm}</q>
			, ci-dessous afin débarrer l'option.
		</p>
		<Field bind:value={answer} variant="outlined" placeholder={confirm} />
		<svelte:fragment slot="footer">
			<Button variant="cta" disabled={confirm !== answer} state="warning">Supprimer</Button>
		</svelte:fragment>
	</Modal>
</fieldset>

<style lang="scss">
	q {
		font-weight: 500;
		color: col(error, 900);

		&::after,
		&::before {
			color: col(fg, 100, 0.5);
			font-weight: 400;
			margin-inline: 0.1em;
		}
	}
</style>
