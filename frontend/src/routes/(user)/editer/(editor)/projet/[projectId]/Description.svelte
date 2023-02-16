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
	<h3 class="legend">Description</h3>
	<TextArea
		name="description"
		variant="default"
		placeholder="Décrivez votre projet en quelques phrases."
		bind:value={_description}
		style="height: 300px; width: 100%;"
	>
		<!-- <svelte:fragment slot="label">Description du projet</svelte:fragment> -->
	</TextArea>
</section>

<style lang="scss">
</style>
