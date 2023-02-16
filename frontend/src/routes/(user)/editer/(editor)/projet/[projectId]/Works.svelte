<script lang="ts">
	import { page } from '$app/stores';
	import Field from '$components/Field/Field.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import TokenButton from '$components/Token/TokenButton.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { debounce } from '$utils/modifiers';
	import Fuse from 'fuse.js';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import { dirty, _type_id } from './common';

	$: ({ workCategories, types } = ($page.data as PageData).descriptors);

	$: workids = [...(($page.data as PageData).project.work_ids ?? [])];

	let form_workids: typeof workids = [];
	function sync(trigger: any) {
		if (Array.isArray(workids)) {
			form_workids = [...workids];
		}
	}
	$: sync(workids);

	$: $dirty.work_ids =
		selected.length !== (workids.length ?? []) ||
		!selected.every((work) => (workids ?? []).indexOf(work.id) > -1);

	$: available = types.find((t) => t.id === $_type_id)?.works ?? [];

	$: selected = form_workids.reduce((acc, curr) => {
		const w = available.find((w) => w.id === curr);
		if (w) {
			acc.push(w);
		}
		return acc;
	}, Array<(typeof available)[number]>(0));

	let searchResults: typeof available | null = null;

	function add(wid: number) {
		if (form_workids.indexOf(wid) < 0) {
			form_workids = [...form_workids, wid];
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
</script>

<section class="editor-section">
	<h3 class="legend">Travaux</h3>
	<ul class="selected">
		{#each selected as w, i (w.id)}
			<li animate:flip={{ duration: 150 }}>
				<Tooltip message={w.description}>
					<Token active>
						{w.title}
						<TokenButton slot="trailing" as="label">
							<Icon name="cross" strokeWidth={2} />
							<input hidden type="checkbox" name="work_id" bind:group={form_workids} value={w.id} />
						</TokenButton>
					</Token>
				</Tooltip>
			</li>
		{/each}
		{#if !selected.length}
			<p class="ui-info" in:fly|local={{ y: 6, duration: 250 }}>
				Sélectionnez un ou plusieurs travaux...
			</p>
		{/if}
	</ul>
	<fieldset class="search" disabled={_type_id === null}>
		<Field
			type="search"
			class="field"
			placeholder="Chercher un type de travail"
			variant="default"
			list="works-data"
			on:input={handleSearch}
		>
			<svelte:fragment slot="leading">
				<FieldIcon name="search" />
			</svelte:fragment>
		</Field>
		<datalist id="works-data">
			{#each workCategories as c}
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
	{#each workCategories as category}
		<fieldset>
			<h4>{category.title}</h4>
		</fieldset>
		<ul class="list">
			{#each (searchResults ?? available).filter((w) => !form_workids.includes(w.id) && w.category_id === category.id) as w, i (w.id)}
				<li animate:flip={{ duration: 100 }}>
					<Tooltip message={w.description}>
						<Token on:pointerdown={() => add(w.id)} as="button">
							{w.title}
						</Token>
					</Tooltip>
				</li>
			{/each}
		</ul>
	{/each}
</section>

<style lang="scss">
	.ui-info {
		display: flex;
		align-items: center;
		height: 3em;
		font-size: var(--ui-text-md);
	}

	.selected {
		padding-block: 1em;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
		font-size: var(--ui-text-sm);
	}

	.search {
		position: sticky;
		top: var(--ui-nav-h);
		align-self: flex-start;
		width: var(--ui-width-sm);
		margin-block: 2rem;
		z-index: 1;

		:global(.field) {
			backdrop-filter: blur(10px);
		}
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
		padding-block: 1rem;
	}

	li {
		display: inline-block;
		position: relative;
		flex: none;
	}
</style>
