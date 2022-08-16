<script lang="ts">
	export let profile;
</script>

<h1>Bonjour {profile.firstname}!</h1>
<section>
	<h2>Mon profil</h2>
	<code>
		<pre>{JSON.stringify(profile, undefined, 4)}</pre>
	</code>
</section>
<section>
	<h2>Fiches éditables</h2>
	<section>
		<h3>Mes fiches de projet</h3>
	</section>
	<section>
		<h3>Projets partagés avec moi</h3>
	</section>
	<section>
		<h3>Mes fiches d'organisation</h3>
	</section>
	<section>
		<h3>Organisations partagées avec moi</h3>
	</section>
	<section>
		<h3>Mes fiches d'acteur</h3>
	</section>
	<section>
		<h3>Acteurs partagés avec moi</h3>
	</section>
</section>
<section>
	<h2>Mes collections</h2>
</section>
<section>
	<h2>Mes votes</h2>
</section>

<style>
	code {
		display: inline-block;
		padding: 1rem;
		background-color: var(--color-light-300);
		border-radius: 12px;
		margin: 0 2rem;
	}
</style>
