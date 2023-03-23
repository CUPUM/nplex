<script lang="ts">
	import AnimateHeight from '$components/AnimateHeight.svelte';
	import Field from '$components/Field/Field.svelte';
	import FieldIcon from '$components/Field/FieldIcon.svelte';
	import Icon from '$components/Icon.svelte';
	import Token from '$components/Token/Token.svelte';
	import TokenButton from '$components/Token/TokenButton.svelte';
	import Tooltip from '$components/Tooltip.svelte';
	import { KEY } from '$utils/enums';
	import { debounce } from '$utils/modifiers';
	import Fuse from 'fuse.js';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { descriptors, projectData } from './common';

	$: available = $descriptors.types.find((t) => t.id === $projectData.type_id)?.works ?? [];

	$: selected = $projectData.work_ids.reduce((acc, curr) => {
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
		if (found && !$projectData.work_ids.includes(found.id)) {
			$projectData.work_ids = [...$projectData.work_ids, found.id];
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
</script>

<div id="tokens-sections">
	<fieldset class="editor-form-group editor-form-group-nomin">
		<div class="stickied">
			<h3 class="editor-form-group-title">Interventions</h3>
			<p>Sélectionnez les interventions qui s'appliquent dans la liste ci-contre.</p>
			<!-- Search tokens -->
			<fieldset id="tokens-search" disabled={$projectData.type_id == null}>
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
					<!-- <FieldOptions slot="options" /> -->
				</Field>
				<datalist id="works-data">
					{#each $descriptors.workCategories as c}
						<optgroup label={c.title}>
							{#each available.filter((w) => w.category_id === c.id) as w}
								<option value={w.title} on:select={(e) => console.log(e)}>
									{w.title}
								</option>
							{/each}
						</optgroup>
					{/each}
				</datalist>
			</fieldset>
			<!-- Selected tokens -->
			<AnimateHeight>
				<ul id="tokens-selected">
					{#each selected as w, i (w.id)}
						<li animate:flip={{ duration: 150 }} transition:fly|local={{ y: 6, duration: 150 }}>
							<Tooltip message={w.description}>
								<Token active>
									{w.title}
									<TokenButton slot="trailing" as="label">
										<Icon name="cross" strokeWidth={2} />
										<input
											hidden
											type="checkbox"
											name="work_id"
											bind:group={$projectData.work_ids}
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
		</div>
	</fieldset>
	<fieldset class="editor-form-group editor-form-group-nomin">
		{#each $descriptors.workCategories as category}
			<h4 class="tokens-group-title heading-sm">{category.title}</h4>
			<AnimateHeight>
				<ul class="tokens-group">
					{#each (searchResults ?? available).filter((w) => w.category_id === category.id) as w, i (w.id)}
						<li animate:flip={{ duration: 100 }}>
							<Tooltip message={w.description}>
								<Token variant="feature" bind:group={$projectData.work_ids} value={w.id}>
									{w.title}
								</Token>
							</Tooltip>
						</li>
					{/each}
				</ul>
			</AnimateHeight>
		{/each}
	</fieldset>
</div>

<style lang="scss">
	#tokens-sections {
		display: flex;
		flex-direction: row;
		gap: var(--ui-gap-sm);
		width: 100%;
	}

	.stickied {
		position: sticky;
		top: calc(1.5rem + var(--ui-nav-h));
	}

	#tokens-selected {
		padding-block: 1em;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
		font-size: var(--ui-text-sm);
		font-weight: 450;
	}

	#tokens-search {
		font-size: var(--ui-text-sm);
		align-self: flex-start;
		margin-block: 2rem;
		z-index: 1;
	}

	#tokens-all {
	}

	.tokens-group {
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

	.tokens-group-title {
		margin: 1em 0.25em 0.5em;
	}
</style>
