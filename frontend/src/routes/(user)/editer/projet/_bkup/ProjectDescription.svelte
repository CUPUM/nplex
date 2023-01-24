<script lang="ts">
	import TextArea from '$components/TextArea.svelte';
	import type { PageData } from './$types';
	import { formProject } from './common';

	export let data: PageData;
</script>

<fieldset class="formgroup">
	<legend class="formgroup-legend">Description</legend>
	<section class="formgroup-fields">
		<TextArea
			name="description"
			variant="default"
			value={$formProject.description}
			placeholder="Décrivez votre projet"
			style="height: 400px; width: 100%;"
		/>
	</section>
</fieldset>

<style lang="scss">
	section {
		// max-width: var(--ui-width-md);
	}
</style>
