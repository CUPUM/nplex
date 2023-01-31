<script lang="ts">
	import Button from '$components/Button.svelte';
	import Icon, { ICON_CLASS } from '$components/Icon.svelte';
	import Select from '$components/Select.svelte';
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';
	import type { DeepNullable } from 'ts-essentials';
	import type { PageData } from './$types';
	import { descriptors, getAvailableUsages } from './common';

	type FormSecondaryUsages = DeepNullable<(typeof secondary_usages)[number]> & {
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
				category_id: null,
				usage_id: null,
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
						<Button variant="danger" equi on:pointerdown={() => remove(usage)}>
							<Icon name="trash" />
						</Button>
					{:else}
						<button on:pointerdown={add} class="add {ICON_CLASS.hover}">
							<Icon name="plus" strokeWidth={2.5} style="opacity: .5" />
							<span class="inner"> Ajouter un usage secondaire </span>
						</button>
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
		padding: 1rem;
		border: 1px solid col(fg, 500, 0.05);
		border-radius: var(--ui-radius-lg);
	}

	button {
		color: col(fg, 100);
		height: var(--ui-height);
		border-radius: var(--ui-radius-md);
		border: 1px dashed col(fg, 500, 0.1);
		display: flex;
		flex-direction: row;
		padding-inline: var(--ui-pad-x);
		align-items: center;
		gap: 0.5em;
		transition: all 0.1s ease-out;

		.inner {
			display: block;
			position: relative;
			top: -0.1em;
		}

		&:hover {
			color: col(primary, 700);
			background: col(primary, 500, 0.1);
			border: 1px dashed transparent;
		}
	}
</style>
