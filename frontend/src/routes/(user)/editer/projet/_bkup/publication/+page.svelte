<script lang="ts">
	import { enhance } from '$app/forms';
	import { FORMID } from '../common';
</script>

<form action="?/update" method="POST" id={FORMID} use:enhance>
	<fieldset class="formgroup">
		<legend class="formgroup-legend">Gérer la visibilité du projet</legend>
		<section class="formgroup-fields">
			<h3>Publier</h3>
			<h3>Supprimer</h3>
		</section>
	</fieldset>
</form>

<style lang="scss">
	form {
		width: 100%;
		display: flex;
		align-items: stretch;
		flex-direction: column;
		margin: 0 auto;
		margin-top: 1.5rem;
	}
</style>
