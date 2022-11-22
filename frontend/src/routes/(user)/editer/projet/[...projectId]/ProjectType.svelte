<script lang="ts" context="module">
</script>

<script lang="ts">
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import type { PageData } from './$types';

	export let project: PageData['project'];
	export let descriptors: PageData['descriptors'];

	$: disabled = !('category_id' in project) || !project.category_id;

	// let s: PageData['descriptors']['types'] = descriptors.types;

	// const fuse = new Fuse(descriptors.types, {
	// 	keys: ['title', 'description'],
	// 	shouldSort: true,
	// 	threshold: 0.5,
	// });

	// const search = debounce((e: Event) => {
	// 	if (e.target instanceof HTMLInputElement) {
	// 		if (e.target.value === '') {
	// 			s = descriptors.types;
	// 			return;
	// 		}
	// 		s = fuse.search(e.target.value).map((r) => r.item);
	// 	}
	// }, 200);

	$: v = descriptors.types.filter(
		(t) =>
			'category_id' in project &&
			typeof project.category_id === 'number' &&
			t.category_ids.includes(project.category_id)
	);

	$: c = descriptors.types.find((t) => t.id === project.type_id);
</script>

<fieldset class="type" {disabled}>
	<h3 class="e-h3">Type de projet</h3>
	<!-- <Field type="search" placeholder="Chercher un type de projet" on:input={search}>
		<FieldIcon slot="leading" name="search" />
	</Field> -->
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
					<label class:checked={project.type_id === t.id}>
						<input
							type="radio"
							value={t.id}
							name="type_id"
							hidden
							bind:group={project.type_id}
						/>
						{t.title}
					</label>
				</li>
			{/each}
		</ul>
	{/if}
</fieldset>

<style lang="scss">
	fieldset {
		width: 100%;
		max-width: var(--ui-display-medium);
		margin: 0 auto;
		&:disabled {
			opacity: 0.2;
			pointer-events: none;
			user-select: none;
		}
		transition: all 0.25s;
		width: 100%;
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

	label {
		cursor: pointer;
		display: flex;
		padding: 1em 1.5em;
		border-radius: 99px;
		background: col(fg, 100, 0.1);
	}

	.checked {
		background: col(fg, 500);
		color: col(bg, 500);
	}
</style>
