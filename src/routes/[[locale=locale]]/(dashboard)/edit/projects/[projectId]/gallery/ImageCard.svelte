<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import Dialog from '$lib/components/Dialog.svelte';
	import DialogFooterMenu from '$lib/components/DialogFooterMenu.svelte';
	import TranslationsField from '$lib/components/TranslationsField.svelte';
	import { superFormDialog } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';
	import { imageUrl } from '$lib/media/url';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { MoveHorizontal, Pen, Save, Trash, X } from 'lucide-svelte';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			save: 'Sauvegarder',
			close: (tainted: unknown) => `Fermer${tainted ? ' sans sauvegarder' : ''}`,
			description: 'Description',
			dialog: {
				title: 'Détails de l’image',
			},
		},
		en: {
			save: 'Save',
			close: (tainted: unknown) => `Close${tainted ? ' without saving' : ''}`,
			description: 'Description',
			dialog: {
				title: 'Image details',
			},
		},
	});

	export let imageTypes: PageData['streamed']['imageTypes'];
	export let datum: PageData['updateImageForms'][number];

	const {
		form,
		enhance,
		submitter,
		tainted,
		reset,
		elements: { trigger, close, ...dialogElements },
		states: { open },
	} = superFormDialog(datum, { dataType: 'json' });

	const {
		elements: { trigger: selectTrigger },
		states: { open: selectOpen },
	} = createSelect();
</script>

<figure class="card">
	<img
		class="card-img"
		src={imageUrl($form.storageName, { resize: { fit: 'inside', height: 250 }, quality: 0.8 })}
		alt="image-{$form.id}"
	/>
	<menu class="card-menu toolbar" data-mode="dark">
		<button
			use:ripple
			class="button ghost danger square"
			type="submit"
			formaction="?/delete&id={$form.id}"
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
	<form method="POST" use:enhance action="?/update">
		<img class="form-img" src={imageUrl($form.storageName)} alt="image-{$form.id}" />
		<fieldset>
			<TranslationsField let:locale>
				<svelte:fragment slot="legend">{$t.description}</svelte:fragment>
				<textarea
					rows="3"
					class="input"
					placeholder={$t.description}
					bind:value={$form.translations[locale].description}
				/>
			</TranslationsField>
		</fieldset>
	</form>
	<svelte:fragment slot="footer">
		<DialogFooterMenu>
			<button use:ripple class="button cta" type="submit">
				<Save class="button-icon" />{$t.save}
			</button>
			<button use:ripple class="button" use:melt={$close} on:m-click={() => reset()}>
				<X class="button-icon" />{$t.close($tainted)}
			</button>
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
