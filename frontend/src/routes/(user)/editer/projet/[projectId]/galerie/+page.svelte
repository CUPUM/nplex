<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';

	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Image from '$components/Image.svelte';
	import Loading from '$components/Loading.svelte';
	import TextArea from '$components/TextArea.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { ThemeClass } from '$routes/AppThemes.svelte';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { EDITOR_FORM_ID, GALLERY_UPLOAD_FORM_ID } from '../common';
	import type { PageData } from './$types';
	import { del } from './common';
	import InputImage from './InputImage.svelte';

	export let data: PageData;

	let uploading = false;
	let updating = false;
	let previews: string[] = [];
	let dragging: number | null = null;
	let target: number | null = null;

	function move(index: number, target: number) {
		const corrected = index < target ? target - 1 : target;
		if (corrected === index) {
			return;
		}
		data.project.gallery.splice(corrected, 0, data.project.gallery.splice(index, 1)[0]);
		data.project.gallery = data.project.gallery;
	}

	function dragstart(index: number) {
		dragging = index;
	}

	function drop() {
		console.log('drop');
		if (target !== null && dragging !== null) {
			move(dragging, target);
		}
		dragging = null;
		target = null;
	}

	function dragover(index: number) {
		target = index;
	}

	function dragleave() {
		target = null;
	}
</script>

<form
	method="POST"
	action="?/upload"
	use:enhance={({ form, data, action, cancel }) => {
		uploading = true;
		return async ({ update, result }) => {
			update({ reset: true });
			uploading = false;
		};
	}}
	class="upload"
	id={GALLERY_UPLOAD_FORM_ID}
>
	<hgroup>
		<h2>Ajoutez vos photos</h2>
		<p>Montez une galerie d'images pour présenter votre projet.</p>
	</hgroup>
	<InputImage {uploading} />
</form>
<form
	class="update"
	method="POST"
	action="?/update"
	id={EDITOR_FORM_ID}
	use:enhance={({ form, data, action, cancel }) => {
		updating = true;
		return async ({ update, result }) => {
			update({ reset: false });
			updating = false;
		};
	}}
>
	<h2>Galerie</h2>
	<ol use:horizontalScroll class:dragging={dragging !== null} on:dragleave={dragleave}>
		{#each data.project.gallery as image, i (image.id)}
			<li
				draggable="true"
				class:drag-subject={dragging === i}
				on:dragover={(e) => e.preventDefault()}
				on:dragstart={() => dragstart(i)}
				on:drop={drop}
				animate:flip={{ duration: 500, easing: expoOut }}
				in:fly={{ y: 12, delay: i * 100, easing: expoOut }}
				out:scale={{ start: 0.95 }}
			>
				<fieldset>
					<Image
						class="gallery-image"
						src={image.publicUrl}
						alt={image.id}
						objectFit="cover"
					/>
					<menu class={ThemeClass.dark}>
						<Tooltip message="Supprimer" place="top">
							<Button type="submit" round form={del(image.id)}>
								<Icon name="trash" />
							</Button>
						</Tooltip>
						<Tooltip message="Définir comme bannière" place="top">
							<Button type="submit" round form={del(image.id)}>
								<Icon name="bookmark" />
							</Button>
						</Tooltip>
						<Tooltip message="Avancer" place="top">
							<Button style="margin-left: auto;" round
								><Icon name="arrow-left" /></Button
							>
						</Tooltip>
						<Tooltip message="Reculer" place="top">
							<Button round><Icon name="arrow-right" /></Button>
						</Tooltip>
					</menu>
				</fieldset>
				<div class="detail">
					<input type="hidden" name="[{i}].id" readonly value={image.id} />
					<input type="hidden" name="[{i}].name" readonly value={image.name} />
					<Field name="[{i}].title" value={image.title ?? ''} variant="outlined">
						<svelte:fragment slot="label">Titre</svelte:fragment>
					</Field>
					<TextArea
						name="[{i}].description"
						value={image.description ?? ''}
						variant="outlined"
					>
						<svelte:fragment slot="label">Description</svelte:fragment>
					</TextArea>
				</div>
				{#if dragging !== null && dragging !== i}
					<hr
						class="before"
						class:target={target === i}
						on:dragover={() => dragover(i)}
					/>
					<hr
						class="after"
						class:target={target === i + 1}
						on:dragover={() => dragover(i + 1)}
					/>
				{/if}
			</li>
		{/each}
		{#if updating}
			<Loading />
		{/if}
	</ol>
</form>
<!-- Hidden forms to handle deletions -->
{#each data.project.gallery as image}
	<form hidden method="POST" action="?/delete" id={del(image.id)} use:enhance>
		<input type="hidden" readonly name="file_name" value={image.name} />
	</form>
{/each}

<style lang="scss">
	h2 {
		padding-inline: 1rem;
	}

	.upload {
		max-width: var(--ui-size-xl);
		width: 100%;
		padding-top: calc(4rem + var(--navbar-height-px));
		padding-inline: 2rem;
		margin-inline: auto;
		border-radius: var(--ui-radius-lg);
		position: relative;
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 2rem;
		hgroup {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 2rem;
		}
		p {
			opacity: 0.5;
			line-height: 1.5;
			margin: 1rem;
			max-width: var(--ui-size-2xs);
		}
	}

	.update {
		display: flex;
		flex-direction: column;
		max-width: var(--ui-size-xl);
		width: 100%;
		margin-inline: auto;
		padding-inline: 2rem;
		h2 {
			width: 100%;
			margin: 4rem auto;
		}
		ol {
			position: relative;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			width: 100%;
			min-height: 100px;
			gap: 0;
			gap: 2rem;
		}
		.dragging {
			li:not(.drag-subject) {
				opacity: 0.8;
			}
		}
		.drag-subject {
			opacity: 1;
			box-shadow: 0 0 0 5px col(fg, 900, 0.1);
			background: col(fg, 900, 0.1);
		}
		li {
			cursor: move;
			position: relative;
			flex: none;
			border-radius: var(--ui-radius-lg);
			transition: all 0.1s ease-out;
			&:hover {
				border-radius: var(--ui-radius-md);
				menu::before {
					opacity: 1;
				}
			}
		}
		fieldset {
			display: flex;
			position: relative;
			padding: 0;
			border-radius: inherit;
			:global(.gallery-image) {
				overflow: hidden;
				border-radius: inherit;
				object-fit: cover;
				aspect-ratio: 4/3;
			}
		}
		menu {
			height: 100%;
			width: 100%;
			position: absolute;
			padding: 1rem;
			bottom: 0;
			font-size: var(--ui-text-sm);
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			border-radius: inherit;
			gap: 3px;
			&::before {
				user-select: none;
				pointer-events: none;
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				height: 100%;
				width: 100%;
				background: linear-gradient(0deg, col(bg, 500, 0.75) 0%, transparent 75%);
				opacity: 0;
				overflow: hidden;
				border-radius: inherit;
				transition: opacity 0.2s;
			}
		}
		.detail {
			margin-top: 1rem;
			gap: 1rem;
			display: flex;
			flex-direction: column;
		}
		hr {
			position: absolute;
			height: calc(100% + 2rem);
			width: calc(50% + 1rem);
			top: -1rem;
			opacity: 0;
			color: col(fg, 500);
			border: 1px solid transparent;
			border-radius: var(--ui-radius-md);
			transition: all 0.2s ease-out;
			&.target {
				opacity: 0.2;
			}
			&.before {
				left: -1rem;
				border-left: 1px solid currentColor;
			}
			&.after {
				right: -1rem;
				border-right: 1px solid currentColor;
			}
		}
	}
</style>
