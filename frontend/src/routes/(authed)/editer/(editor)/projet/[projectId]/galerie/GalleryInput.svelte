<script lang="ts">
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import Loading from '$components/Loading.svelte';
	import Ripple from '$components/Ripple.svelte';
	import { IMAGE_TYPES } from './common';

	let loading = false;
	let inputRef: HTMLInputElement;

	function upload(e: Event) {
		if (
			e.target instanceof Element &&
			'form' in e.target &&
			e.target.form instanceof HTMLFormElement
		) {
			e.target.form.requestSubmit(inputRef);
		}
	}

	function stop(e: PointerEvent) {
		e.stopImmediatePropagation();
	}
</script>

<label class:loading class={ICON_CLASS.hover}>
	<Ripple />
	<Icon class="fill-icon" name="image-add" animationSpeed={0.5} strokeLinecap="round" />
	<legend>Cliquez pour choisir</legend>
	<span>ou</span>
	<legend>déposez vos images ici.</legend>
	<input
		hidden
		type="file"
		name="images"
		accept={IMAGE_TYPES.join(',')}
		multiple
		on:change={upload}
	/>
	<input type="submit" hidden formaction="?/upload" bind:this={inputRef} />
	{#if loading}
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
		border: 1px dashed col(fg, 500, 0.1);
		overflow: hidden;
		transition: all 0.15s ease-out;

		&:hover {
			border: 1px dashed col(primary, 100, 0);
			background: col(primary, 300, 0.1);
			color: col(primary, 700);
		}

		:global(.fill-icon) {
			align-self: center;
			position: absolute;
			opacity: 0.05;
			font-size: 15em;
		}
	}

	.loading {
		border: 1px dashed col(fg, 100, 0);
		background: col(fg, 100, 0.1);
		color: col(fg, 700);
	}

	legend {
		font-size: var(--ui-text-sm);
		text-align: center;
		line-height: 1.5;
		letter-spacing: 0.1px;
		transition: opacity 0.25s;
	}

	span {
		display: block;
		opacity: 0.35;
	}
</style>
