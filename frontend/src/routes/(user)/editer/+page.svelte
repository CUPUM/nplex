<script lang="ts" context="module">
</script>

<script lang="ts">
	import { page } from '$app/stores';

	const base = $page.url.pathname;
</script>

<article>
	<h2>Zone d'édition</h2>
	<ul>
		<li>
			<a href="{base}/projet">Créer un nouveau projet</a>
		</li>
		<li>
			<a href="{base}/organisation">Créer une nouvelle organisation</a>
		</li>
		<li>
			<a href="{base}/acteur">Créer un nouveau profil d'acteur</a>
		</li>
	</ul>
</article>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: row;
	}

	li {
	}
</style>
