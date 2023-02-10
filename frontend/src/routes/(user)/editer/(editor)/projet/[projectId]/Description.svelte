<script lang="ts">
	import { page } from '$app/stores';
	import TextArea from '$components/TextArea.svelte';
	import type { PageData } from './$types';
	import { dirty } from './common';

	$: description = ($page.data as PageData).project.description;

	$: _description = description;

	$: $dirty.description = (_description ?? '') !== (description ?? '');
</script>

<fieldset class="formgroup">
	<legend class="formlegend">Description</legend>
	<section class="formfields">
		<TextArea
			name="description"
			bind:value={_description}
			placeholder="Décrivez votre projet"
			style="height: 300px; width: 100%;"
		/>
	</section>
</fieldset>

<style lang="scss">
	.formfields {
		max-width: var(--ui-width-md);
	}
</style>
