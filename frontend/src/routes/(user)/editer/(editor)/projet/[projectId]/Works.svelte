<script lang="ts">
	import AnimateHeight from '$components/AnimateHeight.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import TokenButton from '$components/Token/TokenButton.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { debounce } from '$utils/modifiers';
	import Fuse from 'fuse.js';
	import { flip } from 'svelte/animate';
	import { editorDirty } from '../../common';
	import EditorFormgroup from '../../EditorFormgroup.svelte';
	import { descriptors, form_type_id, project } from './common';

	let form_work_ids: typeof $project.work_ids = [];
	function sync(trigger: any) {
		if (Array.isArray($project.work_ids)) {
			form_work_ids = [...$project.work_ids];
		}
	}
	$: sync($project.work_ids);

	$: $editorDirty.work_ids =
		selected.length !== ($project.work_ids.length ?? []) ||
		!selected.every((work) => ($project.work_ids ?? []).indexOf(work.id) > -1);

	$: available = $descriptors.types.find((t) => t.id === $form_type_id)?.works ?? [];

	$: selected = form_work_ids.reduce((acc, curr) => {
		const w = available.find((w) => w.id === curr);
		if (w) {
			acc.push(w);
		}
		return acc;
	}, Array<(typeof available)[number]>(0));

	let searchResults: typeof available | null = null;

	function add(wid: number) {
		if (form_work_ids.indexOf(wid) < 0) {
			form_work_ids = [...form_work_ids, wid];
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
	<fieldset class="search" disabled={form_type_id === null}>
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
			{#each $descriptors.workCategories as c}
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
	{#each $descriptors.workCategories as category}
		<fieldset>
			<h4>{category.title}</h4>
		</fieldset>
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
