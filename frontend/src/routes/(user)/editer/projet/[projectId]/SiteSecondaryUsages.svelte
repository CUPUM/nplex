<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Select from '$components/Select.svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import type { DeepUndefinable } from 'ts-essentials';
	import type { PageData } from './$types';
	import { descriptors, getAvailableUsages } from './common';

	type FormSecondaryUsages = DeepUndefinable<(typeof secondary_usages)[number]> & {
		id: string;
	};

	export let secondary_usages: PageData['project']['secondary_usages'];
	let _secondary_usages: FormSecondaryUsages[] = [
		...secondary_usages.map((u) => ({ ...u, id: key(u) })),
	];

	const buttonDatum = {
		id: 'btn',
	} as const;

	function key(usage: PageData['project']['secondary_usages'][number]) {
		return `${usage.category_id}-${usage.usage_id}`;
	}

	function add() {
		_secondary_usages = [
			..._secondary_usages,
			{
				category_id: undefined,
				usage_id: undefined,
				id: crypto.getRandomValues(new Uint8Array(6)).join(''),
			},
		] satisfies FormSecondaryUsages[];
	}

	function remove(usage: any) {
		const index = _secondary_usages.indexOf(usage);
		if (index >= 0) {
			_secondary_usages.splice(index, 1);
			_secondary_usages = _secondary_usages;
		}
	}
</script>

<fieldset class="formgroup">
	<legend class="formlegend">Usage(s) secondaire(s)</legend>
	<section class="formfields">
		<ul>
			{#each [..._secondary_usages, buttonDatum] as usage, i (usage.id)}
				<li animate:flip={{ easing: cubicOut, duration: 150 }}>
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
						<Button on:pointerdown={() => remove(usage)}
							><Icon name="eraser" slot="trailing" />Effacer</Button
						>
					{:else}
						<Button variant="outlined" on:pointerdown={add}>
							<Icon name="plus" slot="leading" />
							Ajouter un usage secondaire
						</Button>
					{/if}
				</li>
			{/each}
		</ul>
	</section>
</fieldset>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: flex-start;
	}

	li:not(:last-of-type) {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		padding: 1.5rem;
		border: 1px solid col(fg, 500, 0.05);
		border-radius: var(--ui-radius-lg);
	}
</style>
