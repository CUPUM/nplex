<script lang="ts">
	import Button from '$components/Button/Button.svelte';
	import ButtonGroup from '$components/Button/ButtonGroup.svelte';
	import Icon from '$components/Icon.svelte';
	import Image from '$components/Image/Image.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { SEARCH_PARAMS } from '$utils/enums';
	import { THEMES } from '$utils/themes';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { project } from '../common';
	import type { PageData } from './$types';
	import GalleryItemDetails from './GalleryItemDetails.svelte';

	export let galleryItem: PageData['project']['gallery'][number];
	export let i: number;

	const dispatch = createEventDispatcher<{ shift: number }>();

	let bannerAction: 'promoting' | 'demoting' | null = null;
	$: $project.banner, (bannerAction = null);
	$: isBanner = $project.banner === galleryItem.id;
</script>

<figure>
	<input type="submit" hidden />
	<Image
		class="image"
		src={galleryItem.publicUrl}
		alt={galleryItem.id}
		color={galleryItem.color_dominant_hsl}
	/>
	<menu class="menu-top">
		<GalleryItemDetails {i} bind:galleryItem />
		<input type="hidden" name="gallery[{i}].id" readonly value={galleryItem.id} />
		<input
			type="hidden"
			name="gallery[{i}].storage_name"
			readonly
			value={galleryItem.storage_name}
		/>
		<input type="text" hidden name="gallery[{i}].title" readonly value={galleryItem.title} />
		<textarea hidden name="gallery[{i}].description" readonly value={galleryItem.description} />
		<input type="hidden" name="gallery[{i}].type" readonly value={galleryItem.type} />
		<input type="hidden" name="gallery[{i}].temporality" readonly value={galleryItem.temporality} />
	</menu>
	<menu
		class="menu-bottom"
		data-theme={THEMES.dark}
		out:fly|local={{ y: 6, duration: 150 }}
		in:fly|local={{ y: 6, delay: 250, duration: 150 }}
	>
		<Tooltip message="Supprimer" place="top" align="start">
			<Button
				equi
				type="submit"
				state="warning"
				formaction="?/delete&{SEARCH_PARAMS.FILENAME}={galleryItem.storage_name}"
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
				formaction="{isBanner ? '?/demote' : '?/promote'}&{SEARCH_PARAMS.IMAGE_ID}={galleryItem.id}"
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
</figure>

<style lang="scss">
	figure {
		--fig-radius: var(--ui-radius-lg);
		--gradient-color: #{col(bg, 900)};
		position: relative;
		width: 100%;
		aspect-ratio: var(--image-ratio);
		display: grid;
		grid-template-areas:
			'image'
			'fields';
		border-radius: var(--fig-radius);
		overflow: hidden;
		transition: all 0.15s, translate 0.1s var(--ui-ease-out);

		& :global(.image) {
			aspect-ratio: 1;
			border-radius: var(--fig-radius);
			transition: box-shadow 0.15s ease-out;
		}

		&:hover {
			box-shadow: 0 3em 2em -1.5em rgb(0, 0, 0, 0.5);
		}
	}

	.menu-top {
		isolation: isolate;
		position: absolute;
		align-self: flex-start;
		width: 100%;
		// border-radius: inherit;
		// border-bottom-left-radius: 0;
		// border-bottom-right-radius: 0;
		padding: 0.5rem;
		font-size: var(--ui-text-sm);

		&::after {
			pointer-events: none;
			content: '';
			opacity: 0.5;
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 150px;
			background: linear-gradient(180deg, var(--gradient-color), transparent);
			border-radius: inherit;
			transition: opacity 0.1s ease-out;

			figure:hover & {
				opacity: 0.8;
			}
		}
	}

	.menu-bottom {
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
			pointer-events: none;
			content: '';
			opacity: 0;
			z-index: -1;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 150px;
			background: linear-gradient(0deg, var(--gradient-color), transparent);
			// border-radius: inherit;
			transition: opacity 0.1s ease-out;

			figure:hover & {
				opacity: 0.8;
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
