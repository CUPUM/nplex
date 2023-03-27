<script lang="ts">
	import Select from '$components/Select/Select.svelte';
	import { descriptors, getAvailableUsages } from './common';

	// export let usage_category_id: PageData['project']['site_usage_category_id'];
	// export let usage_id: PageData['project']['site_usage_id'];

	// $: _usage_category_id = usage_category_id;
	// $: _usage_id = usage_id;
	$: availableUsages = getAvailableUsages(_usage_category_id);
</script>

<fieldset class="formgroup">
	<legend class="formlegend">Usage principal</legend>
	<section class="formfields">
		<Select
			name="site_usage_category_id"
			options={$descriptors.siteUsagesCategories}
			bind:value={_usage_category_id}
		>
			<svelte:fragment slot="label">Catégorie</svelte:fragment>
			<option slot="option" let:option value={option.id}>
				{option.title}
			</option>
		</Select>
		<Select
			name="site_usage_id"
			options={availableUsages}
			bind:value={_usage_id}
			disabled={_usage_category_id == null}
		>
			<svelte:fragment slot="label">Usage</svelte:fragment>
			<option slot="option" let:option value={option.id}>{option.title}</option>
		</Select>
	</section>
</fieldset>

<style lang="scss">
	.formfields {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		flex-wrap: wrap;
		width: 100%;
		max-width: var(--ui-width-sm);

		& > :global(*) {
			flex: 1;
			min-width: 250px;
		}
	}
</style>
