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
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Image from '$components/Image.svelte';
	import TextArea from '$components/TextArea.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { SEARCH_PARAMS } from '$utils/enums';
	import { THEMES } from '$utils/themes';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import type { ValueOf } from 'ts-essentials';
	import type { PageData } from './$types';
	import { _banner_id } from './common';

	export let image: PageData['project']['gallery'][number];
	export let i: number;

	const dispatch = createEventDispatcher();

	let w: number;
	let pressed = false;
	let startX: number | null = null;
	let startY: number | null = null;
	let deltaX = 0;
	let deltaY = 0;
	$: isUnder = $under === i;
	$: isDragging = $dragging === i;

	function dragstart(e: PointerEvent) {
		pressed = true;
		startX = e.clientX;
		startY = e.clientY;
	}

	function stop() {
		if (pressed) {
			pressed = false;
			$dragging = null;
			startX = null;
			startY = null;
			deltaX = 0;
			deltaY = 0;
		}
	}

	function drag(e: PointerEvent) {
		if (!pressed) {
			return;
		}
		if (startX !== null && startY !== null) {
			deltaX = e.clientX - startX;
			deltaY = e.clientY - startY;
		}
		if (deltaX !== 0 || deltaY !== 0) {
			$dragging = i;
		}
	}

	function dragend() {
		if (!isDragging) {
			return;
		}
		stop();
		if ($under != null && $offset != null) {
			const destination = $under + $offset + ($under > i ? -1 : 0);
			dispatch('drop', { destination });
		} else {
			dispatch('cancel');
		}
		$under = null;
		$offset = null;
	}

	function enter() {
		if ($dragging == null || isDragging) {
			return;
		}
		$under = i;
	}

	function leave() {
		$under = null;
		$offset = null;
	}

	function moveover(e: PointerEvent) {
		if (!isUnder) {
			return;
		}
		$offset = e.offsetX > w * 0.5 ? OFFSET.after : OFFSET.before;
	}
</script>

<svelte:window on:pointermove={drag} on:pointerup={dragend} on:contextmenu={dragend} />
<svelte:body on:pointerleave={dragend} />

<div
	bind:offsetWidth={w}
	on:pointermove={moveover}
	on:pointerenter|self={enter}
	on:pointerleave|self={leave}
	class:dragging={isDragging}
	style:--color={image.color_dominant_hsl}
>
	<figure
		on:pointerdown={dragstart}
		on:pointerup={stop}
		on:focusin={stop}
		style:--delta-x="{deltaX}px"
		style:--delta-y="{deltaY}px"
		class:under={isUnder}
		class={isUnder ? ($offset === 0 ? 'before' : 'after') : ''}
	>
		<Image class="image" src={image.publicUrl} alt={image.id} color={image.color_dominant_hsl} />
		{#if !isDragging}
			<menu
				data-theme={THEMES.dark}
				out:fly|local={{ y: 6, duration: 150 }}
				in:fly|local={{ y: 6, delay: 250, duration: 150 }}
			>
				<Tooltip message="Supprimer" place="top">
					<Button
						type="submit"
						variant="danger"
						formaction="?/delete_image&{SEARCH_PARAMS.FILENAME}={image.name}"
						style="backdrop-filter: blur(8px);"
					>
						<Icon name="trash" />
					</Button>
				</Tooltip>
				<Tooltip message="Avancer" place="top">
					<Button
						style="margin-left: auto; backdrop-filter: blur(8px);"
						on:pointerdown={() => dispatch('forward')}><Icon name="arrow-left" /></Button
					>
				</Tooltip>
				<Tooltip
					message={$_banner_id === image.id ? 'Retirer de la bannière' : 'Définir comme bannière'}
					place="top"
				>
					<Button
						type="submit"
						style="backdrop-filter: blur(8px);"
						formaction="{$_banner_id === image.id
							? '?/demote_image'
							: '?/promote_image'}&{SEARCH_PARAMS.IMAGE_ID}={image.id}"
						active={$_banner_id === image.id}
					>
						<Icon name="bookmark" />
					</Button>
				</Tooltip>
				<Tooltip message="Reculer" place="top">
					<Button on:pointerdown={() => dispatch('backward')} style="backdrop-filter: blur(8px);">
						<Icon name="arrow-right" /></Button
					>
				</Tooltip>
			</menu>
		{/if}
		<fieldset>
			<input type="hidden" name="gallery[{i}].id" readonly value={image.id} />
			<input type="hidden" name="gallery[{i}].name" readonly value={image.name} />
			<Field name="gallery[{i}].title" bind:value={image.title}>
				<svelte:fragment slot="label">Titre</svelte:fragment>
			</Field>
			<TextArea
				style="height: 100px;"
				name="gallery[{i}].description"
				bind:value={image.description}
			>
				<svelte:fragment slot="label">Description</svelte:fragment>
			</TextArea>
		</fieldset>
	</figure>
</div>

<style lang="scss">
	div {
		perspective: 1000px;
		padding: calc(0.5 * var(--gap));
		margin-inline: calc(-0.5 * var(--gap));
		border-radius: var(--ui-radius-lg);
		transition: box-shadow 0.25s ease-in-out;
	}

	.dragging {
		pointer-events: none;
		z-index: 10;
		box-shadow: inset 0 0 0 1px col(primary, 300, 0.2);
	}

	figure {
		--fig-radius: var(--ui-radius-lg);
		cursor: move;
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
		position: absolute;
		grid-area: image;
		align-self: flex-end;
		width: 100%;
		gap: 3px;
		display: flex;
		padding: 0.5rem;
		font-size: var(--ui-text-xs);
	}

	fieldset {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		// padding: 6px;
		padding-top: 0;
		margin-top: 0.5rem;
		font-size: var(--ui-text-sm);
	}
</style>
