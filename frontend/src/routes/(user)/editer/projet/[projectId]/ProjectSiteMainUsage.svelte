<script lang="ts">
	import Select from '$components/Select.svelte';
	import { formProject } from '../common';
	import type { PageData } from './$types';

	export let data: PageData;

	function usages(category: number | null) {
		if (category === null) {
			return [];
		}
		const filtered = data.descriptors.siteUsages.filter((u) => {
			u.category_ids.includes(category);
		});
		return filtered;
	}

	$: availableUsages =
		$formProject.site_usage_category_id == null
			? []
			: data.descriptors.siteUsages.filter((u) => {
					return u.category_ids.includes($formProject.site_usage_category_id!);
			  });
</script>

<fieldset class="formgroup">
	<legend class="formgroup-legend">Usage principal</legend>
	<section class="formgroup-fields">
		<Select
			name="site_usage_category_id"
			variant="outlined"
			options={data.descriptors.siteUsagesCategories}
			bind:value={$formProject.site_usage_category_id}
		>
			<svelte:fragment slot="label">Catégorie</svelte:fragment>
			<option slot="option" let:option value={option.id}>
				{option.title}
			</option>
		</Select>
		<Select
			name="site_usage_id"
			variant="outlined"
			options={availableUsages}
			bind:value={$formProject.site_usage_id}
			disabled={$formProject.site_usage_category_id == null}
		>
			<svelte:fragment slot="label">Usage</svelte:fragment>
			<option slot="option" let:option value={option.id}>{option.title}</option>
		</Select>
	</section>
</fieldset>

<style lang="scss">
	.formgroup-fields {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		flex-wrap: wrap;
		width: 100%;
		max-width: var(--ui-width-p);

		& > :global(*) {
			flex: 1;
			min-width: 250px;
		}
	}
</style>
