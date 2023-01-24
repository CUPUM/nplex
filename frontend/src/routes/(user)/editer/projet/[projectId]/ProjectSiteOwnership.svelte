<script lang="ts">
	import Select from '$components/Select.svelte';
	import { formProject } from '../common';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<fieldset class="formgroup">
	<legend class="formgroup-legend">Propriété du site</legend>
	<section class="formgroup-fields">
		<Select
			placeholder="Sélectionnez un type de propriétaire"
			options={data.descriptors.siteOwnerships}
			variant="outlined"
			bind:value={$formProject.site_ownership_id}
			name="site_ownership_id"
		>
			<option let:option slot="option" value={option.id}>
				{option.title}
			</option>
		</Select>
	</section>
</fieldset>

<style lang="scss">
	section {
		align-items: stretch;
		max-width: var(--ui-width-p);
		// font-size: var(--ui-text-sm);
	}

	fieldset {
		// padding-top: 0;
	}
</style>
