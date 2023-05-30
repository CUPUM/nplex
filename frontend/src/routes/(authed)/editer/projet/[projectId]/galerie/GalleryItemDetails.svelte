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
			<Icon name="pen" slot="leading" />Détails
		</Button>
	</svelte:fragment>
	<svelte:fragment slot="header">Détails et ressources de l'image</svelte:fragment>
	<fieldset class="fields">
		<h4>Présentation</h4>
		<Field variant="default" name="gallery[{i}].title" bind:value={galleryItem.title} tabindex={0}>
			<svelte:fragment slot="label">Titre</svelte:fragment>
		</Field>
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
		<h4>Classification</h4>
		<div class="flex flex-r gap-sm justify-s">
			<Select
				class="flex-1"
				name="gallery[{i}].type"
				options={$descriptors.imageTypes}
				required
				bind:value={galleryItem.type}
			>
				<svelte:fragment slot="label">Type d'image</svelte:fragment>
				<option slot="option" let:option value={option.id}>{option.title}</option>
			</Select>
			<Select
				class="flex-1"
				name="gallery[{i}].temporality"
				required
				options={temporalityOptions}
				bind:value={galleryItem.temporality}
			>
				<svelte:fragment slot="label">Temporalité</svelte:fragment>
				<option slot="option" let:option value={option.temporality}>{option.label}</option>
			</Select>
		</div>
		<h4>Crédits</h4>
		<ul class="flex flex-c gap-sm">
			{#each galleryItem.credits as credit}
				<li>{credit.first_name}</li>
			{/each}
		</ul>
		<Modal>
			<svelte:fragment slot="control" let:open>
				<Button type="button" variant="dashed" class="text-sm" on:click={open}>
					Ajouter un crédit <Icon slot="trailing" name="copyright-plus" />
				</Button>
			</svelte:fragment>
			<svelte:fragment slot="header">
				<!--  -->
			</svelte:fragment>
			<fieldset class="fields">
				<Field>
					<svelte:fragment slot="label">Légende</svelte:fragment>
				</Field>
				<Field>
					<svelte:fragment slot="label">Prénom</svelte:fragment>
				</Field>
				<Field>
					<svelte:fragment slot="label">Nom de famille</svelte:fragment>
				</Field>
				<Field>
					<svelte:fragment slot="label">Nom de famille</svelte:fragment>
				</Field>
				<Field>
					<svelte:fragment slot="label">Nom de famille</svelte:fragment>
				</Field>
			</fieldset>
			<svelte:fragment slot="footer">
				<!--  -->
			</svelte:fragment>
		</Modal>
	</fieldset>
	<svelte:fragment slot="footer">
		<Button variant="cta"><Icon name="check" slot="leading" />Continuer</Button>
	</svelte:fragment>
</Modal>

<style lang="scss">
	.fields {
		display: flex;
		flex-direction: column;
		width: var(--ui-width-md);
		max-width: 100%;
		gap: var(--ui-gutter-xs);
	}

	h4 {
		font-size: var(--ui-text-lg);
		font-weight: 500;
		// opacity: 0.5;
		margin: 1rem 0;

		&:first-child {
			margin-top: 0;
		}
	}

	hr {
		margin: 1.5rem calc(-1 * var(--modal-padding));
		border-bottom: 1px solid col(fg, 100, 0.1);
	}
</style>
