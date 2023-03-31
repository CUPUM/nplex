<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import { EDITOR_FORM_ID } from '$routes/(authed)/editer/constants';
	import type { PageData } from './$types';
	import { INDICATORS_KEY, INDICATOR_LABEL_MAX, INDICATOR_TITLE_MAX } from './common';

	export let categoryId: PageData['exemplarityCategories'][number]['id'];
	export let data: PageData['exemplarityCategories'][number]['indicators'][number];

	const modalFormId = `indicator-${data.id}-details`;

	let confirmationString = '';
</script>

<fieldset>
	<div class="handle">
		<Icon name="handle-move-vertical" />
	</div>
	<Field
		variant="default"
		class="text-md"
		rounded
		style="flex: 1"
		placeholder="Titre"
		name="{INDICATORS_KEY}['{data.id}'].title"
		required
		maxlength={INDICATOR_TITLE_MAX}
		bind:value={data.title}
	/>
	<Modal>
		<Button rounded let:open equi variant="ghost" slot="control" on:click={open}>
			<Icon name="parameters" />
		</Button>
		<svelte:fragment slot="header">Détails de l'indicateur</svelte:fragment>
		<div class="modal-content">
			<Field
				variant="outlined"
				maxlength={INDICATOR_TITLE_MAX}
				required
				bind:value={data.title}
				name="title"
			>
				<svelte:fragment slot="label">Nom de l'indicateur</svelte:fragment>
			</Field>
			<Field
				variant="outlined"
				maxlength={INDICATOR_LABEL_MAX}
				required
				bind:value={data.short_title}
				name="short_title"
			>
				<svelte:fragment slot="label">Nom court</svelte:fragment>
			</Field>
			<TextArea variant="outlined" bind:value={data.description} name="description">
				<svelte:fragment slot="label">Description</svelte:fragment>
			</TextArea>
		</div>
		<svelte:fragment slot="footer" let:cancel let:confirm>
			<Button variant="ghost" on:click={cancel}>Fermer</Button>
			<Button
				variant="cta"
				type="submit"
				formaction="?/update"
				form={EDITOR_FORM_ID}
				on:click={confirm}
			>
				Sauvegarder <Icon name="check" slot="trailing" />
			</Button>
		</svelte:fragment>
	</Modal>
	<Modal
		on:close={() => {
			confirmationString = '';
		}}
	>
		<Button
			rounded
			slot="control"
			equi
			variant="ghost"
			state="warning"
			type="submit"
			formaction="?/delete&id={data.id}"
			form={EDITOR_FORM_ID}
			let:requestConfirmation
			on:click={requestConfirmation}
		>
			<Icon name="trash" />
		</Button>
		<svelte:fragment slot="header">Confirmez</svelte:fragment>
		<span class="heading-sm">Désirez-vous vraiment supprimer cet indicateur?</span>
		<p>
			En procédant, le jeton lié à cet indicateur sera effacé pour <b>tous</b>
			les projets de la base de données. Vous ne pourrez-pas revenir en arrière une fois la suppression
			confirmée.
		</p>
		<p>
			Pour supprimer, veuillez d'abord écrire <q>{data.title}</q>
			ci-dessous:
		</p>
		<Field variant="outlined" state="warning" bind:value={confirmationString} />
		<svelte:fragment slot="footer" let:cancel>
			<Button
				variant="default"
				state="warning"
				disabled={confirmationString !== data.title}
				type="submit"
				formaction="?/delete&id={data.id}"
				form={EDITOR_FORM_ID}
			>
				Supprimer
			</Button>
			<Button variant="outlined" on:click={cancel}>Annuler</Button>
		</svelte:fragment>
	</Modal>
	<input type="hidden" name="{INDICATORS_KEY}['{data.id}'].id" readonly value={data.id} />
	<input type="hidden" name="{INDICATORS_KEY}['{data.id}'].category" readonly value={categoryId} />
	<input
		type="hidden"
		name="{INDICATORS_KEY}['{data.id}'].short_title"
		readonly
		value={data.short_title}
	/>
	<input
		type="hidden"
		name="{INDICATORS_KEY}['{data.id}'].description"
		readonly
		value={data.description}
	/>
</fieldset>

<style lang="scss">
	fieldset {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: stretch;
		gap: 0.5em;
		font-size: var(--ui-text-sm);
		padding: 0.2em 0.5em;
		background-color: col(bg, 900);
		// border: var(--ui-border-size) solid col(fg, 100, 0.25);
		border-radius: calc(0.25em + var(--ui-radius-sm));
	}

	.handle {
		cursor: grab;
		padding-inline: 1.5em 1em;
		opacity: 0.5;
		display: flex;
		align-items: center;
	}

	q {
		color: col(error, 900);
		padding: 0.25em 0.5em 0.35em;
		border: 1px solid col(error, 500, 0.2);
		background: col(error, 500, 0.05);
		border-radius: 0.5em;

		&::before,
		&::after {
			display: none;
		}
	}

	.modal-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding-block: 0.5rem;
		width: var(--ui-width-md);
		max-width: 100%;
	}
</style>
