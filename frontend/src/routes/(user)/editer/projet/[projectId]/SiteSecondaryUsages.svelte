<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Select from '$components/Select.svelte';
	import type { DeepUndefinable } from 'ts-essentials';
	import type { PageData } from './$types';
	import { descriptors, getAvailableUsages } from './common';

	export let secondary_usages: PageData['project']['secondary_usages'];
	let _secondary_usages = [...secondary_usages];

	type UndefinableSecondaryUsages = DeepUndefinable<(typeof secondary_usages)[number]>;

	const buttonDatum = {
		id: 'btn',
	};

	function key(usage: PageData['project']['secondary_usages'][number] | typeof buttonDatum) {
		if (!('category_id' in usage)) {
			return usage.id;
		}
		return `${usage.category_id}-${usage.usage_id}`;
	}

	function add() {
		(_secondary_usages as UndefinableSecondaryUsages[]).push({
			category_id: undefined,
			usage_id: undefined,
		});
	}
</script>

<fieldset class="formgroup">
	<legend class="formgroup-legend">Usage(s) secondaire(s)</legend>
	<section class="formgroup-fields">
		<ul>
			{#each [..._secondary_usages, buttonDatum] as usage, i (key(usage))}
				<li>
					{#if 'category_id' in usage}
						<Select
							name="site_secondary_usages[{i}].category_id"
							options={$descriptors.siteUsagesCategories}
							bind:value={usage.category_id}
						>
							<svelte:fragment slot="label">Catégorie</svelte:fragment>
							<option slot="option" let:option value={option.id}>
								{option.title}
							</option>
						</Select>
						<Select
							name="site_usage_id"
							options={getAvailableUsages(usage.category_id)}
							bind:value={usage.usage_id}
							disabled={usage.category_id == null}
						>
							<svelte:fragment slot="label">Usage</svelte:fragment>
							<option slot="option" let:option value={option.id}>{option.title}</option>
						</Select>
						<Button><Icon name="eraser" />Effacer</Button>
					{:else}
						<Button><Icon name="plus" />Ajouter un usage secondaire</Button>
					{/if}
				</li>
			{/each}
		</ul>
	</section>
</fieldset>

<style lang="scss">
</style>
