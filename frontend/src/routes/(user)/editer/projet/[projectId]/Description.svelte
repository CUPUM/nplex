<script lang="ts">
	import TextArea from '$components/TextArea.svelte';
	import type { PageData } from './$types';
	import { dirty } from './common';

	export let description: PageData['project']['description'];

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
