<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import ButtonGroup from '$components/Button/ButtonGroup.svelte';
	import Field from '$components/Field/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Image from '$components/Image/Image.svelte';
	import TextArea from '$components/TextArea/TextArea.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { KEY, SEARCH_PARAMS } from '$utils/enums';
	import { THEMES } from '$utils/themes';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData['project']['gallery'][number];
	export let i: number;

	$: ({ banner_id } = ($page.data as PageData).project);

	let bannerAction: 'promoting' | 'demoting' | null = null;
	$: if (banner_id) {
		bannerAction = null;
	}
	$: bannerActive =
		(banner_id === data.id && bannerAction !== 'demoting') || bannerAction === 'promoting';

	const dispatch = createEventDispatcher<{ shift: number }>();
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
				formaction="?/delete&{SEARCH_PARAMS.FILENAME}={data.name}"
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
			message={banner_id === data.id ? 'Retirer de la bannière' : 'Définir comme bannière'}
			place="top"
			align="end"
		>
			<Button
				equi
				type="submit"
				class="menu-button"
				formaction="{banner_id === data.id
					? '?/demote'
					: '?/promote'}&{SEARCH_PARAMS.IMAGE_ID}={data.id}"
				active={bannerActive}
				loading={!!bannerAction}
				on:click={() => {
					bannerAction = banner_id === data.id ? 'demoting' : 'promoting';
				}}
			>
				<Icon name="bookmark" />
			</Button>
		</Tooltip>
	</menu>
	<fieldset>
		<input type="hidden" name="gallery[{i}].id" readonly value={data.id} />
		<input type="hidden" name="gallery[{i}].name" readonly value={data.name} />
		<Field variant="outlined" name="gallery[{i}].title" bind:value={data.title} tabindex={0}>
			<svelte:fragment slot="label">Titre</svelte:fragment>
		</Field>
		<TextArea
			style="height: 100px;"
			name="gallery[{i}].description"
			variant="outlined"
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

	fieldset {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-top: 1.5rem;
		font-size: var(--ui-text-sm);
	}
</style>
