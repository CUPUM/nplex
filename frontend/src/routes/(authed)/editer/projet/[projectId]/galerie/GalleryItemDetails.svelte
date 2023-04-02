<script lang="ts" context="module">
	const temporalityOptions = [
		{ temporality: TEMPORALITY.Before, label: 'Avant le projet' },
		{ temporality: TEMPORALITY.During, label: 'Pendant le projet' },
		{ temporality: TEMPORALITY.After, label: 'Après le projet' },
	] as const satisfies readonly { temporality: Temporality; label: string }[];
</script>

<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Modal from '$components/Modal/Modal.svelte';
	import Select from '$components/Select/Select.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import { KEY, TEMPORALITY, type Temporality } from '$utils/enums';
	import { descriptors } from '../common';
	import type { PageData } from './$types';

	export let i: number;
	export let galleryItem: PageData['project']['gallery'][number];
</script>

<Modal>
	<svelte:fragment slot="control" let:open>
		<Button variant="outlined" on:click={open}>
			<Icon name="plus" slot="leading" />Détails & ressources
		</Button>
	</svelte:fragment>
	<svelte:fragment slot="header">Détails et ressources de l'image</svelte:fragment>
	<fieldset class="fields">
		<Field variant="default" name="gallery[{i}].title" bind:value={galleryItem.title} tabindex={0}>
			<svelte:fragment slot="label">Titre</svelte:fragment>
		</Field>
		<Select
			name="gallery[{i}].type"
			options={$descriptors.imageTypes}
			required
			bind:value={galleryItem.type}
		>
			<!-- <svelte:fragment slot="label">Type d'image</svelte:fragment> -->
			<option slot="option" let:option value={option.id}>{option.title}</option>
		</Select>
		<Select
			name="gallery[{i}].temporality"
			required
			options={temporalityOptions}
			bind:value={galleryItem.temporality}
		>
			<option slot="option" let:option value={option.temporality}>{option.label}</option>
		</Select>
		<TextArea
			style="height: 100px;"
			name="gallery[{i}].description"
			variant="default"
			bind:value={galleryItem.description}
			on:keypress={(e) => {
				if (e.key === KEY.Enter) {
					e.preventDefault();
					if (e.target instanceof HTMLElement) e.target.closest('form')?.requestSubmit();
				}
			}}
		>
			<svelte:fragment slot="label">Description</svelte:fragment>
		</TextArea>
	</fieldset>
	<hr />
	<fieldset class="fields">
		<Button type="button">Ajouter un crédit <Icon slot="leading" name="plus" /></Button>
	</fieldset>
	<svelte:fragment slot="footer">
		<Button><Icon name="check" slot="leading" />Continuer</Button>
	</svelte:fragment>
</Modal>

<style lang="scss">
	.fields {
		display: flex;
		flex-direction: column;
		width: var(--ui-width-md);
		max-width: 100%;
		gap: var(--ui-gap-sm);
	}

	hr {
		margin: 1.5rem calc(-1 * var(--modal-padding));
		border-bottom: 1px solid col(fg, 100, 0.1);
	}
</style>
