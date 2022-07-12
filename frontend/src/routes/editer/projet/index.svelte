<script lang="ts" context="module">
</script>

<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';
	import Button from '$components/primitives/Button.svelte';
	import Field from '$components/primitives/Field.svelte';

	let newProjectName: string = '';

	function createProject() {
		// Add new row to projects table
		// Await successful response
		// goto(/editer/projectId)...
	}
</script>

<h2>Créer une nouvelle fiche de projet</h2>
<form on:submit|preventDefault={createProject}>
	<Field bind:value={newProjectName} required>Nom du projet</Field>
	<Button type="submit" disabled={!newProjectName}>Démarrer le projet</Button>
</form>
<hr />
<span>ou</span>
<hr />
<h2>Éditer une fiche existante</h2>
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
<Field>Chercher</Field>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.projects-list {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		white-space: nowrap;
		overflow-x: auto;
		padding-block: 2rem;
		padding-inline: 0 2rem;

		li {
			border-radius: 1.5rem;
			padding: 2rem;
			background-color: var(--color-light-300);
			aspect-ratio: 1;
			display: inline-block;
		}
	}
</style>
