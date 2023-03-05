<script lang="ts" context="module">
	const OFFSET = {
		before: 0,
		after: 1,
	} as const;
	const dragging = writable<number | null>(null);
	const offset = writable<ValueOf<typeof OFFSET> | null>(null);
	const under = writable<number | null>(null);
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Image from '$components/Image/Image.svelte';
	import TextArea from '$components/TextArea.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { SEARCH_PARAMS } from '$utils/enums';
	import { THEMES } from '$utils/themes';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import type { ValueOf } from 'ts-essentials';
	import type { PageData } from './$types';

	export let data: PageData['project']['gallery'][number];
	export let i: number;
	export let dragging: boolean = false;

	$: ({ banner_id } = ($page.data as PageData).project);

	const dispatch = createEventDispatcher();
</script>

<figure>
	<Image class="image" src={data.publicUrl} alt={data.id} color={data.color_dominant_hsl} />
	{#if !dragging}
		<menu
			data-theme={THEMES.dark}
			out:fly|local={{ y: 6, duration: 150 }}
			in:fly|local={{ y: 6, delay: 250, duration: 150 }}
		>
			<Tooltip message="Supprimer" place="top">
				<Button
					rounded
					equi
					type="submit"
					variant="danger"
					formaction="?/delete&{SEARCH_PARAMS.FILENAME}={data.name}"
					style="backdrop-filter: blur(8px);"
				>
					<Icon name="trash" />
				</Button>
			</Tooltip>
			<Tooltip message="Avancer" place="top">
				<Button
					rounded
					equi
					style="margin-left: auto; backdrop-filter: blur(8px);"
					on:pointerdown={() => dispatch('forward')}
				>
					<Icon name="arrow-left" />
				</Button>
			</Tooltip>
			<Tooltip
				message={banner_id === data.id ? 'Retirer de la bannière' : 'Définir comme bannière'}
				place="top"
			>
				<Button
					rounded
					equi
					type="submit"
					style="backdrop-filter: blur(8px);"
					formaction="{banner_id === data.id
						? '?/demote'
						: '?/promote'}&{SEARCH_PARAMS.IMAGE_ID}={data.id}"
					active={banner_id === data.id}
				>
					<Icon name="bookmark" />
				</Button>
			</Tooltip>
			<Tooltip message="Reculer" place="top">
				<Button
					rounded
					equi
					on:pointerdown={() => dispatch('backward')}
					style="backdrop-filter: blur(8px);"
				>
					<Icon name="arrow-right" />
				</Button>
			</Tooltip>
		</menu>
	{/if}
	<fieldset>
		<input type="hidden" name="gallery[{i}].id" readonly value={data.id} />
		<input type="hidden" name="gallery[{i}].name" readonly value={data.name} />
		<Field variant="outlined" name="gallery[{i}].title" bind:value={data.title}>
			<svelte:fragment slot="label">Titre</svelte:fragment>
		</Field>
		<TextArea
			style="height: 100px;"
			name="gallery[{i}].description"
			variant="outlined"
			bind:value={data.description}
		>
			<svelte:fragment slot="label">Description</svelte:fragment>
		</TextArea>
	</fieldset>
</figure>

<style lang="scss">
	// .dragging {
	// 	pointer-events: none;
	// 	z-index: 10;
	// 	box-shadow: inset 0 0 0 1px col(primary, 300, 0.2);
	// }

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

		&:hover:not(.under) {
			// background: col(bg, 300);
			// box-shadow: 0 0 0 10px col(bg, 300);

			:global(.image) {
				box-shadow: 0 1rem 5rem -2.5rem rgb(0, 10, 20, 0.25);
			}
		}

		& :global(.image) {
			aspect-ratio: 1;
			border-radius: var(--fig-radius);
			transition: box-shadow 0.15s ease-out;
		}

		.dragging & {
			translate: var(--delta-x) var(--delta-y);
			scale: 0.9;
			backdrop-filter: blur(12px);
			// background: col(bg, 000);
			// box-shadow: 0 0 0 12px col(bg, 000);
			transition: all 0.15s, translate 0s, scale 0.1s;
		}
	}

	.under {
		user-select: none;
		opacity: 0.5;
		scale: 0.96;

		&.before {
			transform: rotateY(-8deg) translateX(24px);
		}

		&.after {
			transform: rotateY(8deg) translateX(-24px);
		}
	}

	menu {
		isolation: isolate;
		position: absolute;
		grid-area: image;
		align-self: flex-end;
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
			transition: opacity 0.25s ease-out;

			figure:hover & {
				opacity: 1;
			}
		}
	}

	fieldset {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-top: 1.5rem;
		// margin-top: 0.5rem;
		font-size: var(--ui-text-sm);
	}
</style>
