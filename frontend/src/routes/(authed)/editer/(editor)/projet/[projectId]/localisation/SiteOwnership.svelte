<script lang="ts">
	import Select from '$components/Select/Select.svelte';
	import type { PageData } from './$types';

	export let descriptors: PageData['descriptors'];
	export let ownership_id: PageData['project']['site_ownership_id'];

	$: _ownership_id = ownership_id;
</script>

<fieldset class="editor-formgroup">
	<h3 class="editor-formgroup-title">Propriété du site</h3>
	<section class="formfields">
		<Select
			placeholder="Sélectionnez un type de propriétaire"
			options={descriptors.siteOwnerships}
			bind:value={_ownership_id}
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
		max-width: var(--ui-width-sm);
		// font-size: var(--ui-text-sm);
	}

	fieldset {
		// padding-top: 0;
	}
</style>
