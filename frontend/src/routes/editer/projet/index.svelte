<script lang="ts" context="module">
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import EditorProjectsList from '$components/complexes/EditorProjectsList.svelte';
	import { messages } from '$stores/messages';
	import type { definitions } from '$types/database';
	import { db } from '$utils/database';

	let titleInput: HTMLInputElement;
	let newProjectName: string = '';

	async function createProject(e: SubmitEvent) {
		const data = new FormData(e.target as HTMLFormElement);
		try {
			const { body, error } = await db.from<definitions['projects']>('projects').insert({
				title: data.get('project-title').toString(),
				// type: data.get('type'),
			});
			if (error) throw error;
			await goto('/editer/' + body['id']);
		} catch (err) {
			messages.dispatch({
				text: `Il y a eu une erreur lors de la création de la nouvelle fiche. (${err.message})`,
				type: 'error',
			});
		}
	}

	const projectTypes = ['Nouvelle construction', 'Transformation'];
</script>

<section class="pad">
	<h2 class="col">Créer une nouvelle fiche de projet</h2>
	<form on:submit|preventDefault={createProject}>
		<label>
			<span>Titre du projet: </span>
			<input bind:this={titleInput} name="project-title" type="text" required />
		</label>
		<fieldset>
			<legend>Type de projet: </legend>
			<ul>
				{#each projectTypes as t}
					<li>
						<label>
							<span>{t}</span>
							<input type="radio" name="project-type" value={t} id="project-type-{t}" required />
						</label>
					</li>
				{/each}
			</ul>
		</fieldset>
		<button type="submit">Créer la fiche</button>
	</form>
</section>
<hr />
<EditorProjectsList />

<style lang="scss">
	.pad {
		padding-inline: 2rem;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 2rem;
	}

	fieldset {
		appearance: none;
		display: inline-flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border: none;
		background-color: var(--color-light-300);
		border-radius: 1.5rem;
		margin: 0;
	}

	legend {
		float: left;
		position: relative;
		border: none;
		padding: 0;
		margin: 0;
	}
</style>
