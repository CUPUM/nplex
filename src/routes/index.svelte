<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<section id="projects">
	<h1>Projets</h1>
	<ul>
		<li>Projet 1...</li>
		<li>Projet 2...</li>
		<li>Projet 3...</li>
	</ul>
	<a href="/projets" sveltekit:prefetch>Voir plus...</a>
</section>
<section id="orgs">
	<h1>Organisations</h1>
	<ul>
		<li>Org 1...</li>
		<li>Org 2...</li>
	</ul>
	<a href="/organisations" sveltekit:prefetch>Voir plus...</a>
</section>
<section id="actors">
	<h1>Acteurs</h1>
	<ul>[Featured actors here]</ul>
	<a href="/acteurs" sveltekit:prefetch>Voir plus...</a>
</section>

<style>
	section {
		width: 100%;
		padding: var(--size-xxxlarge);
	}

	ul {
		display: block;
		padding: 0;
		margin: 0;
		text-indent: 0;
	}

	li {
		width: 200px;
		height: 300px;
		background-color: var(--color-light-100);
		border-radius: var(--size-xlarge);
		display: inline-flex;
	}

	li:not(:last-child) {
		margin-right: var(--size-xlarge);
	}
</style>
