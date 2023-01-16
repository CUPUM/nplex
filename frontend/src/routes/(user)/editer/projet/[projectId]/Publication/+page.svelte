<script lang="ts">
	import { enhance } from '$app/forms';
	import { FORMID } from '../common';
</script>

<form action="?/update" method="POST" id={FORMID} use:enhance>
	<h2>Gérer la visibilité du projet</h2>
	<h3>Publier</h3>
	<h3>Supprimer</h3>
</form>

<style lang="scss">
</style>
