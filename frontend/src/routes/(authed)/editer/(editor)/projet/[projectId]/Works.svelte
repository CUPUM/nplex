<script lang="ts">
	import { page } from '$app/stores';
	import AnimateHeight from '$components/AnimateHeight.svelte';
	import Dirty from '$components/Dirty.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import TokenButton from '$components/Token/TokenButton.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { KEY } from '$utils/enums';
	import { debounce } from '$utils/modifiers';
	import Fuse from 'fuse.js';
	import { onDestroy } from 'svelte';
	import { flip } from 'svelte/animate';
	import { editorDirtyValues } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import type { PageData } from './$types';
	import { editTypeId } from './common';

	$: work_ids = ($page.data as PageData).project.work_ids;
	$: descriptors = ($page.data as PageData).descriptors;

	let form_work_ids = [...($page.data as PageData).project.work_ids];
	function sync() {
		form_work_ids = [...work_ids];
	}
	$: work_ids, sync();

	$: available = descriptors.types.find((t) => t.id === $editTypeId)?.works ?? [];

	$: selected = form_work_ids.reduce((acc, curr) => {
		const w = available.find((w) => w.id === curr);
		if (w) {
			acc.push(w);
		}
		return acc;
	}, Array<(typeof available)[number]>(0));

	let searchResults: typeof available | null = null;

	/**
	 * Returns true if new value added.
	 */
	function addByTitle(title: string) {
		const found = available.find((w) => w.title === title);
		console.log(found);
		if (found && !form_work_ids.includes(found.id)) {
			form_work_ids = [...form_work_ids, found.id];
			return true;
		}
		return false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === KEY.Enter || e.key === KEY.Tab) {
			if (e.target instanceof HTMLInputElement) {
				addByTitle(e.target.value) && (e.target.value = '');
			}
		}
	}

	const fuse = new Fuse(available, { keys: ['title', 'description'], threshold: 0.5 });
	$: fuse.setCollection(available);

	const handleSearch = debounce((e: Event) => {
		if (e.target instanceof Element && 'value' in e.target) {
			if (typeof e.target.value === 'string' && e.target.value.length) {
				searchResults = fuse.search(e.target.value).map((r) => r.item);
			} else {
				searchResults = null;
			}
		}
	}, 250);

	onDestroy(() => {
		$editorDirtyValues.work_ids = false;
	});
</script>

<Dirty sample={work_ids} specimen={form_work_ids} bind:dirty={$editorDirtyValues.work_ids} />
<EditorFormgroup legend="Travaux">
	<AnimateHeight>
		<ul class="selected">
			{#each selected as w, i (w.id)}
				<li animate:flip={{ duration: 150 }}>
					<Tooltip message={w.description}>
						<Token active>
							{w.title}
							<TokenButton slot="trailing" as="label">
								<Icon name="cross" strokeWidth={2} />
								<input
									hidden
									type="checkbox"
									name="work_id"
									bind:group={form_work_ids}
									value={w.id}
								/>
							</TokenButton>
						</Token>
					</Tooltip>
				</li>
			{/each}
			{#if !selected.length}
				<Token disabled variant="dashed">Sélectionnez un ou plusieurs travaux...</Token>
			{/if}
		</ul>
	</AnimateHeight>
	<fieldset class="search" disabled={editTypeId === null}>
		<Field
			type="search"
			class="field"
			placeholder="Chercher un type de travail"
			variant="outlined"
			list="works-data"
			on:input={handleSearch}
			on:keydown={handleKeydown}
		>
			<svelte:fragment slot="leading">
				<FieldIcon name="search" />
			</svelte:fragment>
		</Field>
		<datalist id="works-data">
			{#each descriptors.workCategories as c}
				<optgroup>
					{#each available.filter((w) => w.category_id === c.id) as w}
						<option value={w.title} on:select={(e) => console.log(e)}>
							{w.description}Bonjour
						</option>
					{/each}
				</optgroup>
			{/each}
		</datalist>
	</fieldset>
	{#each descriptors.workCategories as category}
		<h4>{category.title}</h4>
		<AnimateHeight>
			<ul class="list">
				{#each (searchResults ?? available).filter((w) => w.category_id === category.id) as w, i (w.id)}
					<li animate:flip={{ duration: 100 }}>
						<Tooltip message={w.description}>
							<Token as="label" variant="subtle">
								{w.title}
								<input type="checkbox" bind:group={form_work_ids} value={w.id} hidden />
							</Token>
						</Tooltip>
					</li>
				{/each}
			</ul>
		</AnimateHeight>
	{/each}
</EditorFormgroup>

<style lang="scss">
	.selected {
		padding-block: 1em;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
		font-size: var(--ui-text-sm);
	}

	.search {
		font-size: var(--ui-text-sm);
		align-self: flex-start;
		width: var(--ui-width-sm);
		margin-block: 2rem;
		z-index: 1;
	}

	.list {
		position: relative;
		font-size: var(--ui-text-sm);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
		align-items: flex-start;
		justify-content: flex-start;
		padding-top: 1rem;
	}

	li {
		display: inline-block;
		position: relative;
		flex: none;
	}

	h4 {
		font-size: var(--ui-text-sm);
		font-weight: 500;
		margin-left: 1em;
		margin-top: 1rem;
	}
</style>
