<script lang="ts">
	import { page } from '$app/stores';
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { IMAGE_TYPES } from './common';

	export let uploading = false;

	let inputRef: HTMLInputElement;

	// To do: use xhr store to keep track of progress.
	function upload(e: Event) {
		if (
			e.target instanceof Element &&
			'form' in e.target &&
			e.target.form instanceof HTMLFormElement
		) {
			uploading = true;
			e.target.form.requestSubmit(inputRef);
		}
	}

	$: if ($page.status < 400) uploading = false;
</script>

<label class:uploading class={ICON_CLASS.hover}>
	<Ripple />
	<Icon
		class="image-icon"
		name="image-add"
		animationSpeed={0.5}
		strokeWidth={1.5}
		strokeLinecap="round"
	/>
	<legend>
		Cliquez pour choisir
		<span>ou</span>
		<nobr>déposez vos images ici.</nobr>
	</legend>
	<input
		hidden
		type="file"
		name="images"
		accept={IMAGE_TYPES.join(',')}
		multiple
		on:change={upload}
	/>
	<input type="submit" hidden formaction="?/upload" bind:this={inputRef} />
	{#if uploading}
		<Loading />
	{/if}
</label>

<style lang="scss">
	label {
		user-select: none;
		aspect-ratio: 1;
		font-size: var(--ui-text-md);
		position: relative;
		border-radius: var(--ui-radius-lg);
		color: col(fg, 100);
		font-weight: 400;
		line-height: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		text-align: center;
		border: var(--ui-border-thickness) dashed col(fg, 500, 0.2);
		overflow: hidden;
		padding: 3rem;
		transition: all 0.1s ease-out;

		&:hover {
			border-color: col(primary, 700, 0.5);
			background: col(primary, 300, 0.1);
			color: col(primary, 700);
		}
	}

	label :global(.image-icon) {
		opacity: 0.5;
		align-self: center;
		font-size: 2rem;
		transition: opacity 0.15s;
	}

	legend {
		font-size: var(--ui-text-sm);
		text-align: center;
		line-height: 1.5;
		letter-spacing: 0.1px;
		transition: opacity 0.15s;
	}

	span {
		opacity: 0.35;
	}

	.uploading {
		pointer-events: none;
		border: 1px dashed col(fg, 100, 0);
		color: col(fg, 700);
		@include skeleton-pulse;

		legend {
			opacity: 0;
		}

		:global(.image-icon) {
			opacity: 0;
		}
	}
</style>
