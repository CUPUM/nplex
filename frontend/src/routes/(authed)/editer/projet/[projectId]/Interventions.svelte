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
	import CreateIntervention from './CreateIntervention.svelte';
	import { descriptors, project } from './common';

	$: console.log($descriptors.types);

	$: available = $descriptors.types.find((t) => t.id === $project.type)?.interventions ?? [];

	$: selected = $project.interventions.reduce((acc, curr) => {
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
		if (found && !$project.interventions.includes(found.id)) {
			$project.interventions = [...$project.interventions, found.id];
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

<fieldset class="editor-form-group editor-form-group-nomin">
	<h3 class="editor-form-group-title">Interventions</h3>
	<p>Sélectionnez les interventions qui s'appliquent dans la liste ci-contre.</p>
	<section id="tokens-manager">
		<!-- Selected tokens -->
		<AnimateHeight>
			<ul id="tokens-selected">
				{#each selected as w, i (w.id)}
					<li animate:flip={{ duration: 150 }} transition:fly|local={{ y: 6, duration: 150 }}>
						<Tooltip message={w.description}>
							<Token variant="editor" checked>
								{w.title}
								<TokenButton slot="trailing" as="label" state="warning">
									<Icon name="cross" strokeWidth={2} />
									<input
										hidden
										type="checkbox"
										name="intervention"
										bind:group={$project.interventions}
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
		<!-- Search tokens -->
		<fieldset id="tokens-search" disabled={$project.type == null}>
			<Field
				type="search"
				class="field"
				placeholder="Chercher un type de travail"
				variant="default"
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
				{#each $descriptors.interventionCategories as c}
					<optgroup label={c.title}>
						{#each available.filter((w) => w.category === c.id) as w}
							<option value={w.title} on:select={(e) => console.log(e)}>
								{w.title}
							</option>
						{/each}
					</optgroup>
				{/each}
			</datalist>
		</fieldset>
	</section>
	<div id="tokens-sections">
		<section id="tokens-lists">
			{#each $descriptors.interventionCategories as category}
				<hr />
				<h4 class="tokens-group-title">{category.title}</h4>
				<AnimateHeight>
					<ul class="tokens-group">
						{#each (searchResults ?? available).filter((pitv) => pitv.category === category.id) as itv, i (itv.id)}
							<li animate:flip={{ duration: 100 }}>
								<Tooltip message={itv.description}>
									<Token variant="editor" bind:group={$project.interventions} value={itv.id}>
										{itv.title}
									</Token>
								</Tooltip>
							</li>
						{/each}
					</ul>
					<CreateIntervention categoryId={category.id} />
				</AnimateHeight>
			{/each}
		</section>
	</div>
</fieldset>

<style lang="scss">
	#tokens-sections {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 2rem;
		width: 100%;
	}

	#tokens-manager {
		min-width: 400px;
		flex: 1;
		display: flex;
		flex-direction: row;
		gap: var(--ui-gap-md);
		align-items: flex-start;
		justify-content: stretch;
	}

	#tokens-selected {
		padding-block: 0.5em;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
		font-size: var(--ui-text-sm);
		width: 100%;
	}

	#tokens-search {
		min-width: 350px;
		flex: 1;
		position: relative;
		font-size: var(--ui-text-sm);
		max-width: var(--ui-width-sm);
	}

	hr {
		margin: 3rem 0;
		border-bottom: 1px dashed col(bg, 500);
	}

	#tokens-lists {
		min-width: var(--ui-width-sm);
		flex: 2;
	}

	.tokens-group {
		position: relative;
		font-size: var(--ui-text-sm);
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.25em;
		align-items: flex-start;
		justify-content: flex-start;
		padding-block: 1rem;
	}

	li {
		display: inline-block;
		position: relative;
		flex: none;
	}

	.tokens-group-title {
		opacity: 0.5;
		font-weight: 500;
		margin: 1.5em 0.25em;
	}
</style>
