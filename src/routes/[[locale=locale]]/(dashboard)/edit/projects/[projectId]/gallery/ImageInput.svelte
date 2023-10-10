<script lang="ts">
	import { IMAGE_FILE_TYPES_ARR } from '$lib/media/constants';
	import { ImagePlus } from 'lucide-svelte';
	import type { FormEventHandler } from 'svelte/elements';

	function upload(e: Parameters<FormEventHandler<HTMLInputElement>>[0]) {
		if (
			!(
				e.target instanceof HTMLElement &&
				'form' in e.target &&
				e.target.form instanceof HTMLFormElement
			)
		) {
			return;
		}
		e.target.form.requestSubmit(uploadButton);
	}

	let uploadButton: HTMLButtonElement;
</script>

<button hidden bind:this={uploadButton} formaction="?/upload" type="submit" />
<label class="button">
	<input
		hidden
		type="file"
		name="images"
		accept={IMAGE_FILE_TYPES_ARR.join(',')}
		multiple
		on:change={upload}
	/>
	<ImagePlus class="button-icon" />
	Ajouter une image
</label>

<style lang="postcss">
</style>
