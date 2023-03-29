<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import ButtonGroup from '$components/Button/ButtonGroup.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Image from '$components/Image/Image.svelte';
	import Select from '$components/Select/Select.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { KEY, SEARCH_PARAMS, TEMPORALITY, type Temporality } from '$utils/enums';
	import { THEMES } from '$utils/themes';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { descriptors, project } from '../common';
	import type { PageData } from './$types';

	export let data: PageData['project']['gallery'][number];
	export let i: number;

	const dispatch = createEventDispatcher<{ shift: number }>();
	const temporalityOptions = [
		{ temporality: TEMPORALITY.Before, label: 'Avant le projet' },
		{ temporality: TEMPORALITY.During, label: 'Pendant le projet' },
		{ temporality: TEMPORALITY.After, label: 'Après le projet' },
	] as const satisfies readonly { temporality: Temporality; label: string }[];

	let bannerAction: 'promoting' | 'demoting' | null = null;
	$: $project.banner, (bannerAction = null);
	$: isBanner = $project.banner === data.id;
</script>

<figure>
	<input type="submit" hidden />
	<Image class="image" src={data.publicUrl} alt={data.id} color={data.color_dominant_hsl} />
	<menu
		data-theme={THEMES.dark}
		out:fly|local={{ y: 6, duration: 150 }}
		in:fly|local={{ y: 6, delay: 250, duration: 150 }}
	>
		<Tooltip message="Supprimer" place="top" align="start">
			<Button
				equi
				type="submit"
				state="warning"
				formaction="?/delete&{SEARCH_PARAMS.FILENAME}={data.storage_name}"
				class="menu-button"
			>
				<Icon name="trash" />
			</Button>
		</Tooltip>
		<ButtonGroup>
			<Tooltip message="Avancer" place="top">
				<Button equi class="menu-button" on:pointerdown={() => dispatch('shift', -1)}>
					<Icon name="arrow-left" />
				</Button>
			</Tooltip>
			<Tooltip message="Reculer" place="top">
				<Button equi on:pointerdown={() => dispatch('shift', 1)} class="menu-button">
					<Icon name="arrow-right" />
				</Button>
			</Tooltip>
		</ButtonGroup>
		<Tooltip
			message={isBanner ? 'Retirer de la bannière' : 'Définir comme bannière'}
			place="top"
			align="end"
		>
			<Button
				equi
				type="submit"
				class="menu-button"
				formaction="{isBanner ? '?/demote' : '?/promote'}&{SEARCH_PARAMS.IMAGE_ID}={data.id}"
				active={isBanner}
				loading={!!bannerAction}
				on:pointerup={() => {
					bannerAction = isBanner ? 'demoting' : 'promoting';
				}}
			>
				<Icon name="bookmark" />
			</Button>
		</Tooltip>
	</menu>
	<fieldset class="fields">
		<input type="hidden" name="gallery[{i}].id" readonly value={data.id} />
		<input type="hidden" name="gallery[{i}].storage_name" readonly value={data.storage_name} />
		<Field variant="default" name="gallery[{i}].title" bind:value={data.title} tabindex={0}>
			<svelte:fragment slot="label">Titre</svelte:fragment>
		</Field>
		<Button type="button">Ajouter un crédit <Icon slot="leading" name="plus" /></Button>
		<Select
			name="gallery[{i}].type"
			options={$descriptors.imageTypes}
			required
			bind:value={data.type}
		>
			<!-- <svelte:fragment slot="label">Type d'image</svelte:fragment> -->
			<option slot="option" let:option value={option.id}>{option.title}</option>
		</Select>
		<Select
			name="gallery[{i}].temporality"
			required
			options={temporalityOptions}
			bind:value={data.temporality}
		>
			<option slot="option" let:option value={option.temporality}>{option.label}</option>
		</Select>
		<TextArea
			style="height: 100px;"
			name="gallery[{i}].description"
			variant="default"
			bind:value={data.description}
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
</figure>

<style lang="scss">
	figure {
		--fig-radius: var(--ui-radius-lg);
		position: relative;
		width: 100%;
		aspect-ratio: var(--image-ratio);
		display: grid;
		grid-template-areas:
			'image'
			'fields';
		border-radius: var(--fig-radius);
		transition: all 0.15s, translate 0.1s var(--ui-ease-out);

		& :global(.image) {
			aspect-ratio: 1;
			border-radius: var(--fig-radius);
			transition: box-shadow 0.15s ease-out;
		}
	}

	menu {
		isolation: isolate;
		position: absolute;
		grid-area: image;
		align-self: flex-end;
		justify-content: space-between;
		width: 100%;
		gap: 3px;
		display: flex;
		padding: 0.5rem;
		font-size: var(--ui-text-xs);
		border-radius: inherit;

		&::after {
			content: '';
			opacity: 0;
			z-index: -1;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 150px;
			background: linear-gradient(0deg, col(bg, 100, 0.8), col(bg, 100, 0));
			border-radius: inherit;
			transition: opacity 0.1s ease-out;

			figure:hover & {
				opacity: 1;
			}
		}

		:global(.menu-button) {
			backdrop-filter: blur(10px);
		}
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: var(--ui-gap-sm);
		padding-top: var(--ui-gap-sm);
		font-size: var(--ui-text-sm);
	}
</style>
