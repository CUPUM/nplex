<script lang="ts">
	function submit() {
		console.log('Test');
	}
</script>

<form on:submit|preventDefault={submit}>
	<label for="username">Courriel</label>
	<input id="username" type="text">
	<label for="password">Mot de passe</label>
	<input id="password" type="text">
	<button type="submit">Soumettre</button>
</form>
