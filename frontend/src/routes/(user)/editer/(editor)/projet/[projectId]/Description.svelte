<script lang="ts">
	import { page } from '$app/stores';
	import TextArea from '$components/TextArea.svelte';
	import type { PageData } from './$types';
	import { dirty } from './common';

	$: description = ($page.data as PageData).project.description;

	$: _description = description;

	$: $dirty.description = (_description ?? '') !== (description ?? '');
</script>

<section class="editor-section">
	<h3>Description</h3>
	<TextArea
		name="description"
		bind:value={_description}
		placeholder="Décrivez votre projet"
		style="height: 300px; width: 100%;"
	/>
</section>

<style lang="scss">
</style>
