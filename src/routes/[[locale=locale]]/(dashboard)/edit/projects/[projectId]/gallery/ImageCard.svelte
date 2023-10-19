<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import Dialog from '$lib/components/Dialog.svelte';
	import DialogFooterMenu from '$lib/components/DialogFooterMenu.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { imageUrl } from '$lib/media/url';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { MoveHorizontal, Pen, Save, Trash } from 'lucide-svelte';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			save: 'Sauvegarder',
			close: (tainted: boolean) => `Fermer${tainted ? ' sans sauvegarder' : ''}`,
			description: 'Description',
			dialog: {
				title: 'Détails de l’image',
			},
		},
		en: {
			save: 'Save',
			close: (tainted: boolean) => `Close${tainted ? ' without saving' : ''}`,
			description: 'Description',
			dialog: {
				title: 'Image details',
			},
		},
	});

	export let imageTypes: PageData['imageTypes'][number];
	export let image: PageData['images'][number];

	const {
		elements: { trigger, close, ...dialogElements },
		states: { open },
	} = createDialog();
</script>

<figure class="card">
	<img
		class="card-img"
		src={imageUrl(image.storageName, { resize: { fit: 'inside', height: 250 }, quality: 0.8 })}
		alt="image-{image.id}"
	/>
	<menu class="card-menu toolbar" data-mode="dark">
		<button
			use:ripple
			class="button ghost danger square"
			type="submit"
			formaction="?/delete&id={image.id}"
		>
			<Trash class="button-icon" />
		</button>
		<button class="button ghost square" type="button" use:ripple use:melt={$trigger}>
			<Pen class="button-icon" />
		</button>
		<hr />
		<button class="button square ghost" type="button" disabled>
			<MoveHorizontal class="button-icon" />
		</button>
	</menu>
</figure>

<Dialog {...dialogElements} {close} {open}>
	<svelte:fragment slot="header">Test</svelte:fragment>
	<form method="POST">
		<img class="form-img" src={imageUrl(image.storageName)} alt="image-{image.id}" />
		<fieldset class="labeled-group">
			<legend class="label">{$t.description}</legend>
			<textarea rows="3" class="input" placeholder={$t.description}></textarea>
		</fieldset>
	</form>
	<svelte:fragment slot="footer">
		<DialogFooterMenu>
			<button use:ripple class="button cta" type="submit">
				<Save class="button-icon" />{$t.save}
			</button>
			<button use:ripple class="button" use:melt={$close}>{$t.close(false)}</button>
		</DialogFooterMenu>
	</svelte:fragment>
</Dialog>

<style lang="postcss">
	.card {
		position: relative;
		height: 250px;
		flex: none;
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-sm), var(--shadow-lg);
	}

	.card-img {
		object-fit: cover;
		height: 100%;
		width: 100%;
		border-radius: inherit;
		cursor: zoom-in;
	}

	.card-menu {
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 1rem;
		font-size: var(--size-xs);
		backdrop-filter: blur(6px);
		background-color: color-mix(in srgb, var(--color-neutral-950) 85%, transparent);
	}

	form {
		display: grid;
		grid-template-areas: 'image fields';
		grid-template-columns: minmax(100px, 250px) 1fr;
		gap: var(--base-gutter);
		font-size: var(--size-sm);
	}

	.form-img {
		grid-area: image;
		display: block;
		object-fit: cover;
		border-radius: var(--radius-sm);
		max-height: 50vh;
		flex: 1;
	}

	fieldset {
		grid-area: fields;
		flex: none;
		/* min-width: var(--width-sm); */
	}
</style>
