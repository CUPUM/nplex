<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { GALLERY_IMAGE_TYPES, GALLERY_INPUT_NAME } from './common';

	export let loading = false;
</script>

<label class:loading>
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
	/>
	{#if loading}
		<Loading />
	{/if}
</label>

<style lang="scss">
	label {
		font-size: var(--ui-text-md);
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

	.loading {
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
