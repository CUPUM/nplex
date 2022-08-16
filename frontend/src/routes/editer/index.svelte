<script lang="ts" context="module">
</script>

<script lang="ts">
	let editableProjects = Array(5)
		.fill(null)
		.map((_, i) => ({
			title: 'Projet test ' + (i + 1),
			id: Math.round(Math.random() * 100000).toString(16),
		}));
</script>

<h2>Éditer une fiche</h2>
<p>Vous trouverez ci-dessous les fiches qui vous sont accessibles pour éditer.</p>

<style lang="scss">
	li {
	}
</style>
