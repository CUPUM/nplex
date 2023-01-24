<script lang="ts">
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { GALLERY_IMAGE_TYPES, GALLERY_INPUT_NAME } from './common';

	export let loading = false;
</script>

<label class:loading class={ICON_CLASS.hover}>
	<Ripple />
	<div class="icon">
		<Icon name="image-add" animateSpeed={2} strokeWidth={1} />
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
		aspect-ratio: 1;
		font-size: var(--ui-text-md);
		position: relative;
		border-radius: var(--ui-radius-lg);
		color: col(fg, 000);
		font-weight: 400;
		line-height: 1.5;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 3rem;
		margin: calc(1.5rem * 0.5);
		text-align: center;
		border: 2px dashed col(fg, 100, 0.2);
		min-height: 12rem;
		transition: all 0.15s ease-out;

		&:hover {
			border: 2px dashed col(fg, 100, 0);
			background: col(fg, 100, 0.1);

			.icon {
				opacity: 1;
			}

			legend {
				opacity: 1;
			}
		}
	}

	.loading {
		pointer-events: none;
		scale: 0.9;

		legend,
		.icon {
			opacity: 0.2;
		}
	}

	.icon {
		opacity: 0.25;
		font-size: 4rem;
		transition: all 0.25s ease;
	}

	legend {
		font-size: var(--ui-text-sm);
		text-align: center;
		padding-bottom: 1.5rem;
		opacity: 0.25;
		line-height: 1.3;
		transition: all 0.25s;
	}
</style>
