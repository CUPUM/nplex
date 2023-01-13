<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { GALLERY_IMAGE_TYPES, GALLERY_INPUT_NAME } from './common';

	let uploading = false;

	function upload(e: Event) {
		if (e.target instanceof HTMLInputElement && e.target.form) {
			e.target.form.requestSubmit();
		}
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
>
	<label class:uploading>
		<Ripple />
		<hgroup>
			<h2>Ajoutez vos photos</h2>
			<p>Montez une galerie d'images pour présenter votre projet.</p>
		</hgroup>
		<div class="icon">
			<Icon name="image-add" strokeWidth={2} />
		</div>
		<legend>Cliquez pour importer vos photos ou déposez des fichiers ici.</legend>
		<input
			hidden
			type="file"
			name={GALLERY_INPUT_NAME}
			accept={GALLERY_IMAGE_TYPES.join(',')}
			multiple
			on:change
			on:change={upload}
		/>
		{#if uploading}
			<Loading />
		{/if}
	</label>
</form>

<style lang="scss">
	label {
		position: relative;
		border-radius: var(--ui-radius-xl);
		color: col(fg, 000);
		font-weight: 400;
		line-height: 1.5;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 1rem;
		text-align: center;
		background: col(fg, 900, 0.1);
		opacity: 0.5;
		min-height: 12rem;
		transition: all 0.2s ease-out;

		&:hover {
			opacity: 1;
			border-radius: var(--ui-radius-lg);
		}
	}

	.uploading {
		pointer-events: none;
		background: col(fg, 900, 0.2);

		legend,
		.icon {
			opacity: 0.2;
		}
	}

	.icon {
		font-size: 2rem;
		transition: all 0.1s ease-in-out;
	}

	legend {
		text-align: center;
		padding-bottom: 1.5rem;
		max-width: var(--ui-block-xs);
	}
</style>
