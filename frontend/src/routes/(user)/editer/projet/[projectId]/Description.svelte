<script lang="ts">
	import TextArea from '$components/TextArea.svelte';
	import type { PageData } from './$types';
	import { dirty } from './common';

	export let description: PageData['project']['description'];

	$: _description = description;

	$: if (_description == '') {
		_description = null;
	}

	$: $dirty.description = _description !== description;
</script>

<fieldset class="formgroup">
	<legend class="formgroup-legend">Description</legend>
	<section class="formgroup-fields">
		<TextArea
			name="description"
			variant="default"
			bind:value={_description}
			placeholder="Décrivez votre projet"
			style="height: 300px; width: 100%;"
		/>
	</section>
</fieldset>

<style lang="scss">
</style>
