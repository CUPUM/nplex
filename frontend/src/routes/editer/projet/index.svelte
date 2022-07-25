<script lang="ts" context="module">
</script>

<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';
	import { goto } from '$app/navigation';
	import { messages } from '$stores/messages';
	import type { definitions } from '$types/database';
	import { db } from '$utils/database';

	let newProjectName: string = '';

	async function createProject(e: SubmitEvent) {
		const data = new FormData(e.target as HTMLFormElement);
		// console.log(Object.fromEntries(data));
		try {
			const res = await db.from<definitions['projects']>('projects').insert({
				title: data.get('project-title').toString(),
				// type: data.get('type'),
			});
			if (res.error) throw res.error;
			await goto('/editer/' + res.body.id);
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
			<input name="project-title" type="text" required />
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
<section class="pad">
	<h2>Éditer une fiche existante</h2>
	<form action="">
		<label>
			<span>Chercher dans mes fiches: </span>
			<input type="search" />
		</label>
	</form>
</section>
<section>
	<ul class="projects-list" use:horizontalScroll>
		<li>(liste des fiches existantes accessibles à l'utilisateur)</li>
		<li>(liste des fiches existantes accessibles à l'utilisateur)</li>
		<li>(liste des fiches existantes accessibles à l'utilisateur)</li>
		<li>(liste des fiches existantes accessibles à l'utilisateur)</li>
		<li>(liste des fiches existantes accessibles à l'utilisateur)</li>
		<li>(liste des fiches existantes accessibles à l'utilisateur)</li>
		<li>(liste des fiches existantes accessibles à l'utilisateur)</li>
		<li>(liste des fiches existantes accessibles à l'utilisateur)</li>
	</ul>
</section>

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

	.projects-list {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		white-space: nowrap;
		overflow-x: scroll;
		overflow-y: visible;
		padding-block: 3rem;
		padding-inline: 2rem;

		li {
			border-radius: 1.5rem;
			padding: 2rem;
			background-color: white;
			box-shadow: 0 1.5rem 5rem -4rem black;
			aspect-ratio: 1;
			display: inline-block;
		}
	}
</style>
