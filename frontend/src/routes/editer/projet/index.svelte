<script lang="ts" context="module">
	import type { Load } from './__types';

	export const load: Load = async ({ fetch }) => {
		const descriptors = await (await fetch('/api/projects/descriptors.json', { method: 'GET' })).json();

		return {
			props: {
				descriptors,
			},
		};
	};
</script>

<script lang="ts">
	import EditorProjectsList from '$components/complexes/EditorProjectsList.svelte';
	import { LocalStorage } from '$utils/keys';
	import { persistWritable } from '$utils/persistStore';

	export let descriptors: DatabaseRpc.ProjectDescriptors;
	const newProject = persistWritable(LocalStorage.NewProject, {
		title: undefined,
		type: undefined,
	});

	async function createProject() {
		const res = await fetch('/api/projects/new.json', {
			method: 'POST',
			body: JSON.stringify($newProject as any),
		});
	}
</script>

<div class="core-grid">
	<form on:submit|preventDefault={createProject}>
		<h2 class="col">Créez une nouvelle fiche de projet</h2>
		<label>
			<span>Titre du projet: </span>
			<input bind:value={$newProject.title} name="project-title" type="text" required />
		</label>
		<fieldset>
			<legend>Type de projet: </legend>
			{#each descriptors.types as t}
				<label>
					{t.title}
					<input type="radio" bind:group={$newProject.type} name="type" value={t.id} required />
				</label>
			{/each}
		</fieldset>
		<button type="submit">Créer la fiche</button>
	</form>
	<hr />
	<section>
		<EditorProjectsList />
	</section>
</div>

<style lang="scss">
	form {
		grid-column: main;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	hr {
		grid-column: full;
	}

	section {
		grid-column: full;
	}
</style>
