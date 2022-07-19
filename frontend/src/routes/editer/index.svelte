<script lang="ts" context="module">
</script>

<script lang="ts">
	import { horizontalScroll } from '$actions/horizontalScroll';
	import Button from '$components/primitives/Button.svelte';

	let editableProjects = Array(5)
		.fill(null)
		.map((_, i) => ({
			title: 'Projet test ' + (i + 1),
			id: Math.round(Math.random() * 100000).toString(16),
		}));
</script>

<h2>Éditer une fiche</h2>
<p>Vous trouverez ci-dessous les fiches qui vous sont accessibles pour éditer:</p>
<h4>Soumettre un nouveau projet ou éditer une fiche existante à laquelle vous avez accès</h4>
<ul use:horizontalScroll>
	<li>
		<a href="/editer/projet" class="button-parent">
			<Button href="/editer/projet" icon="arrow-right" iconPosition="trailing">Créer une nouvelle fiche</Button>
		</a>
	</li>
	{#each editableProjects as p}
		<li>
			<a href="editer/{p.id}">Projet: {p.title}</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	li {
	}
</style>
