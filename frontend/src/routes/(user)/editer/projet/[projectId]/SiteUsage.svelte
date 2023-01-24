<script lang="ts">
	import Select from '$components/Select.svelte';
	import type { PageData } from './$types';
	import { descriptors, getAvailableUsages, project } from './common';

	export let usageCategoryId: PageData['project']['site_usage_category_id'];
	export let usageId: PageData['project']['site_usage_id'];

	$: availableUsages = getAvailableUsages($project.site_usage_category_id);
</script>

<fieldset class="formgroup">
	<legend class="formgroup-legend">Usage principal</legend>
	<section class="formgroup-fields">
		<Select
			name="site_usage_category_id"
			options={$descriptors.siteUsagesCategories}
			bind:value={$project.site_usage_category_id}
		>
			<svelte:fragment slot="label">Catégorie</svelte:fragment>
			<option slot="option" let:option value={option.id}>
				{option.title}
			</option>
		</Select>
		<Select
			name="site_usage_id"
			options={availableUsages}
			bind:value={$project.site_usage_id}
			disabled={$project.site_usage_category_id == null}
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
