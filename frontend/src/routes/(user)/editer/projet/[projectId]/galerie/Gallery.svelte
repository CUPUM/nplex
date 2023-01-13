<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import Icon from '$components/Icon.svelte';
	import Image from '$components/Image.svelte';
	import Loading from '$components/Loading.svelte';
	import TextArea from '$components/TextArea.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { SEARCH_PARAMS } from '$utils/enums';
	import { THEMES } from '$utils/themes';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { formid } from '../common';
	import type { PageData } from './$types';

	export let data: PageData;

	let updating = false;
	let dragging: number | null = null;
	let target: number | null = null;

	function move(index: number, target: number) {
		if (target === index) {
			return;
		}
		data.project.gallery.splice(target, 0, data.project.gallery.splice(index, 1)[0]);
		data.project.gallery = data.project.gallery;
	}

	function dragstart(index: number) {
		dragging = index;
	}

	function drop() {
		if (target !== null && dragging !== null) {
			const corrected = target > dragging ? target - 1 : target;
			move(dragging, corrected);
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
	class="update"
	method="POST"
	action="?/update"
	id={formid}
	use:enhance={({ form, data, action, cancel }) => {
		updating = true;
		return async ({ update, result }) => {
			update({ reset: false });
			updating = false;
		};
	}}
>
	<h2>Galerie</h2>
	<ol class:dragging={dragging !== null} on:dragleave={dragleave}>
		{#each data.project.gallery as image, i (image.id)}
			<li
				draggable="true"
				class:drag-subject={dragging === i}
				on:dragover={(e) => e.preventDefault()}
				on:dragstart={() => dragstart(i)}
				on:drop={drop}
				on:dragend={drop}
				animate:flip={{ duration: 500, easing: expoOut }}
				in:fly={{ y: 12, delay: i * 100, easing: expoOut }}
				out:scale|local={{ start: 0.95 }}
			>
				<div class="image">
					<Image class="gallery-image" src={image.publicUrl} alt={image.id} />
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
							message={data.project.banner_id === image.id
								? 'Retirer de la bannière'
								: 'Définir comme bannière'}
							place="top"
						>
							<Button
								type="submit"
								formaction="{data.project.banner_id === image.id
									? '?/demote'
									: '?/promote'}&{SEARCH_PARAMS.IMAGE_ID}={image.id}"
								active={data.project.banner_id === image.id}
								round
							>
								<Icon name="bookmark" />
							</Button>
						</Tooltip>
						<Tooltip message="Reculer" place="top">
							<Button round on:pointerdown={() => move(i, i + 1)}
								><Icon name="arrow-right" /></Button
							>
						</Tooltip>
					</menu>
				</div>
				<fieldset>
					<input type="hidden" name="[{i}].id" readonly value={image.id} />
					<input type="hidden" name="[{i}].name" readonly value={image.name} />
					<Field name="[{i}].title" value={image.title ?? ''} variant="outlined">
						<svelte:fragment slot="label">Titre</svelte:fragment>
					</Field>
					<TextArea name="[{i}].description" value={image.description ?? ''} variant="outlined">
						<svelte:fragment slot="label">Description</svelte:fragment>
					</TextArea>
				</fieldset>
				{#if dragging !== null && dragging !== i}
					<div class="drop before" class:target={target === i} on:dragover={() => dragover(i)} />
					<div
						class="drop after"
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

<style lang="scss">
</style>
