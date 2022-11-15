<script lang="ts" context="module">
</script>

<script lang="ts">
	import Field from '$components/Field.svelte';
	import FieldIcon from '$components/FieldIcon.svelte';

	import Token from '$components/Token.svelte';
	import { throttle } from '$utils/function';

	import type { PageData } from './$types';

	export let project: PageData['project'];
	export let descriptors: PageData['descriptors'];

	let s: PageData['descriptors']['types'] = [];

	const search = throttle((e: Event) => {
		if (e.target instanceof HTMLInputElement) {
			if (e.target.value === '') {
				s = [];
				return;
			}
			s = descriptors.types.filter((t) => {
				t.title + t.description;
			});
		}
	}, 200);

	$: vt = descriptors.types.filter(
		(t) =>
			'category_id' in project &&
			typeof project.category_id === 'number' &&
			t.categories_ids.includes(project.category_id)
	);
</script>

<fieldset>
	{#if 'category_id' in project}
		<Field type="search" placeholder="Chercher un type de projet" on:input={search}>
			<FieldIcon slot="leading" name="search" />
		</Field>
		<fieldset>
			<h4>Primed:</h4>
			{#each s as t}
				<Token value={t.id}>
					{t.title}
				</Token>
			{/each}
		</fieldset>
		{#each vt as t}
			<Token value={t.id}>
				{t.title}
			</Token>
		{/each}
	{:else}
		<div class="placeholder">
			<p>
				Veuillez d'abord sélectionner une catégorie de projet.<br />
				Les types de projets valides seront ensuite disponibles.
			</p>
		</div>
	{/if}
</fieldset>

<style lang="scss">
	fieldset {
	}

	.placeholder {
		color: col(fg, 100, 0.2);
		padding: 2rem;
		border-radius: var(--ui-radius);
		border: 1px dashed currentColor;
	}
</style>
