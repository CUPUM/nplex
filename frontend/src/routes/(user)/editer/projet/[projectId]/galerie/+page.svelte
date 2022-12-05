<script lang="ts" context="module">
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import Loading from '$components/Loading.svelte';
	import { formid } from '../common';
	import type { PageData } from './$types';
	import { FILES_INPUT_NAME, MIME_TYPES } from './common';

	export let data: PageData;

	let uploading = false;
	let files: FileList;
	let previews: string[] = [];

	function preview(e: Event) {
		if (e.target instanceof HTMLInputElement && e.target.form) {
			e.target.form.requestSubmit();
			// previews = files ? Array.from(files).map((f) => URL.createObjectURL(f)) : [];
		}
	}
</script>

<h2>Ajouter des photos</h2>
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
		Ajouter des photos pour présenter votre projet...
		<input
			hidden
			type="file"
			name={FILES_INPUT_NAME}
			accept={MIME_TYPES.join(',')}
			multiple
			on:change={preview}
		/>
	</label>
	{#if uploading}
		<Loading />
	{/if}
</form>
<h2>Galerie</h2>
<form action="?/update" method="POST" use:enhance id={formid}>
	<code>
		{JSON.stringify(data.project.gallery)}
	</code>
</form>

<style lang="scss">
	.upload {
		position: relative;
		margin: 0 auto;
		label {
			border-radius: var(--ui-radius-md);
			border: 2px dashed col(bg, 900);
			color: col(fg, 900);
			font-size: var(--ui-text-md);
			font-weight: 300;
			line-height: 1.5;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			height: 100%;
			width: 100%;
			padding: 3rem;
			text-align: center;
		}
	}

	code {
		padding: 2rem;
		min-height: 500px;
	}
</style>
