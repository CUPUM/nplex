<script>
	export let dbproject;
</script>

{#if dbproject}
	<h1>Éditer le projet intitulé {dbproject.title}</h1>
{:else}
	<h1>Soumettre un nouveau projet</h1>
{/if}
<h2>Site du projet</h2>
<p>Sélectionner un site existant:</p>
<select>
	<!-- alimenter avec db -->
	<option />
</select>
<p>...ou <button href="./site">créer un nouveau site</button></p>
