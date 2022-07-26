<script lang="ts" context="module">
</script>

<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';
	import { goto } from '$app/navigation';
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
<section class="pad">
	<h2>Éditer une fiche-projet existante</h2>
	<form action="">
		<label>
			<span>Chercher dans mes fiches: </span>
			<input type="search" />
		</label>
	</form>
</section>
<section>
	<ul class="projects-list" use:horizontalScroll>
		{#each Array(5).fill(null) as item, i}
			<li class="project-card">
				<a href="">
					Projet {i}
				</a>
			</li>
		{/each}
		<li class="submit-card">
			<h3>+ Créer un nouveau projet</h3>
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
		</li>
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
		position: relative;
		display: flex;
		flex-direction: row;
		gap: 2rem;
		white-space: nowrap;
		overflow-x: scroll;
		overflow-y: visible;
		padding-block: 3rem;
		padding-inline: 2rem;

		.project-card,
		.submit-card {
			flex: none;
			position: relative;
			border-radius: 1.5rem;
			padding: 2rem;
			background-color: white;
			box-shadow: 0 1rem 3rem -2rem rgba(var(--rgb-dark-900), 0.25);
			aspect-ratio: 2 / 3;
			display: inline-block;
			width: 33%;
			min-width: 300px;
			max-width: 500px;
		}

		.submit-card {
			background-color: transparent;
			box-shadow: 0 0 0 1px rgba(var(--rgb-dark-500), 0.1);
		}
	}
</style>
