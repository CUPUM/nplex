<script lang="ts" context="module">
	const target: Writable<HTMLElement | null> = writable(null);
</script>

<script lang="ts">
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Image from '$components/Image.svelte';
	import TextArea from '$components/TextArea.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { SEARCH_PARAMS } from '$utils/enums';
	import { THEMES } from '$utils/themes';
	import { writable, type Writable } from 'svelte/store';
	import { formProject } from '../common';
	import type { PageData } from './$types';

	export let image: PageData['project']['gallery'][number];
	export let i: number;

	let dragging = false;

	function move(target: number) {
		if (target === i) {
			return;
		}
		$formProject.gallery.splice(target, 0, $formProject.gallery.splice(i, 1)[0]);
	}

	function dragstart() {
		dragging = true;
	}

	function drag(e: PointerEvent) {
		if (!dragging) {
			return;
		}
		console.log(dragging);
	}

	function drop() {
		dragging = false;
		$target = null;
	}

	function dragover(index: number) {
		// target = index;
	}

	function dragleave() {
		// target = null;
	}
</script>

<svelte:window on:drag={drag} />

<figure on:dragstart={dragstart} on:dragend={drop}>
	<Image class="image" src={image.publicUrl} alt={image.id} />
	<menu data-theme={THEMES.dark}>
		<Tooltip message="Supprimer" place="top">
			<Button
				type="submit"
				round
				warning
				formaction="?/delete&{SEARCH_PARAMS.FILENAME}={image.name}"
			>
				<Icon name="trash" />
			</Button>
		</Tooltip>
		<Tooltip message="Avancer" place="top">
			<Button style="margin-left: auto;" round on:pointerdown={() => move(i, i - 1)}
				><Icon name="arrow-left" /></Button
			>
		</Tooltip>
		<Tooltip
			message={$formProject.banner_id === image.id
				? 'Retirer de la bannière'
				: 'Définir comme bannière'}
			place="top"
		>
			<Button
				type="submit"
				formaction="{$formProject.banner_id === image.id
					? '?/demote'
					: '?/promote'}&{SEARCH_PARAMS.IMAGE_ID}={image.id}"
				active={$formProject.banner_id === image.id}
				round
			>
				<Icon name="bookmark" />
			</Button>
		</Tooltip>
		<Tooltip message="Reculer" place="top">
			<Button round on:pointerdown={() => move(i, i + 1)}><Icon name="arrow-right" /></Button>
		</Tooltip>
	</menu>
	<fieldset>
		<input type="hidden" name="[{i}].id" readonly value={image.id} />
		<input type="hidden" name="[{i}].name" readonly value={image.name} />
		<Field style="--radius: var(--ui-radius-lg);" name="[{i}].title" value={image.title ?? ''}>
			<svelte:fragment slot="label">Titre</svelte:fragment>
		</Field>
		<TextArea
			style="height: 100px; --radius: var(--ui-radius-lg);"
			name="[{i}].description"
			value={image.description ?? ''}
		>
			<svelte:fragment slot="label">Description</svelte:fragment>
		</TextArea>
	</fieldset>
</figure>

<style lang="scss">
	figure {
		--radius: var(--ui-radius-lg);
		--inset: 8px;
		cursor: move;
		position: relative;
		width: 100%;
		aspect-ratio: var(--image-ratio);
		display: grid;
		grid-template-areas:
			'image'
			'fields';
		border-radius: calc(var(--radius) + var(--inset));
		padding: var(--inset);
		transition: all 0.25s;

		&:hover {
			background: col(bg, 100);
		}

		& :global(.image) {
			aspect-ratio: 1;
			border-radius: var(--radius);
		}
	}

	menu {
		position: absolute;
		grid-area: image;
		align-self: flex-end;
		margin: 0.5rem;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 8px;
	}
</style>
