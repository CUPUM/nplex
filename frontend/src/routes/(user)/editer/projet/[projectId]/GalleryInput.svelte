<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { IMAGE_TYPES } from './common';

	export let loading = false;
</script>

<label class:loading>
	<Ripple />
	<div class="icon">
		<Icon name="image-add" animateSpeed={2} strokeWidth={1} />
	</div>
	<legend>Cliquez pour sélectionner ou déposez des fichiers ici.</legend>
	<input hidden type="file" name="images" accept={IMAGE_TYPES.join(',')} multiple on:change />
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
		line-height: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 3rem;
		margin: calc(1.5rem * 0.5);
		text-align: center;
		border: 1px dashed col(fg, 100, 0.2);
		transition: all 0.15s ease-out;

		&:hover {
			border: 1px dashed col(primary, 100, 0);
			background: col(primary, 100, 0.1);
			color: col(primary, 700);

			.icon {
				opacity: 1;
			}

			legend {
				opacity: 1;
			}
		}
	}

	.loading {
		border: 1px dashed col(fg, 100, 0);
		background: col(fg, 100, 0.1);
		color: col(fg, 700);

		legend,
		.icon {
			opacity: 0.2;
		}
	}

	.icon {
		opacity: 0.25;
		font-size: 3rem;
		transition: opacity 0.25s ease;
	}

	legend {
		font-size: var(--ui-text-sm);
		text-align: center;
		padding-bottom: 1rem;
		opacity: 0.2;
		line-height: 1.3;
		transition: opacity 0.25s;
	}
</style>
