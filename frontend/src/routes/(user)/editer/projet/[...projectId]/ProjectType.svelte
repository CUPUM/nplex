<script lang="ts" context="module">
</script>

<script lang="ts">
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';
	import Token from '$components/Token.svelte';
	import { debounce } from '$utils/function';
	import Fuse from 'fuse.js';
	import { flip } from 'svelte/animate';
	import { scale, slide } from 'svelte/transition';
	import type { PageData } from './$types';

	export let project: PageData['project'];
	export let descriptors: PageData['descriptors'];

	let s: PageData['descriptors']['types'] = descriptors.types;

	const q = new Fuse(descriptors.types, { keys: ['title', 'description'], shouldSort: true, threshold: 0.5 });

	const search = debounce((e: Event) => {
		if (e.target instanceof HTMLInputElement) {
			if (e.target.value === '') {
				s = descriptors.types;
				return;
			}
			s = q.search(e.target.value).map((r) => r.item);
		}
	}, 200);

	$: disabled = !('category_id' in project);

	$: v = s.filter(
		(t) =>
			'category_id' in project &&
			typeof project.category_id === 'number' &&
			t.categories_ids.includes(project.category_id)
	);

	$: c = descriptors.types.find((t) => t.id === project.type_id);
</script>

<fieldset class="type" {disabled}>
	<h3>Type de projet</h3>
	<Field type="search" placeholder="Chercher un type de projet" on:input={search}>
		<FieldIcon slot="leading" name="search" />
	</Field>
	{#if c}
		<div class="selected" transition:slide>
			<Token>{c?.title}</Token>
		</div>
	{/if}
	{#if disabled}
		<p class="placeholder">
			Veuillez d'abord sélectionner une catégorie de projet.<br />
			Les types de projets valides seront ensuite disponibles.
		</p>
	{:else}
		<ul>
			{#each v as t, i (t.id)}
				<li
					in:scale={{ start: 0.9, opacity: 0, duration: 250, delay: i * 20 }}
					out:scale={{ start: 0.9, opacity: 0, duration: 250, delay: i * 10 }}
					animate:flip={{ delay: i * 10, duration: 200 }}
				>
					<Token value={t.id} name="type_id" type="checkbox" bind:group={project.type_id} compact>
						{t.title}
					</Token>
				</li>
			{/each}
		</ul>
	{/if}
</fieldset>

<style lang="scss">
	fieldset {
		position: relative;
		&:disabled {
			opacity: 0.2;
			pointer-events: none;
			user-select: none;
		}
		transition: all 0.25s;
		width: 100%;
		max-width: var(--ui-medium);
	}

	.placeholder {
		padding: 2rem;
		border-radius: var(--ui-radius);
		border: 1px dashed currentColor;
		text-align: center;
		margin: 0;
	}

	ul {
		all: unset;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5em;
		position: relative;
	}

	li {
		all: unset;
		flex: none;
		display: inline-block;
	}
</style>
