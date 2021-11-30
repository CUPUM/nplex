<script lang="ts">
	import { supabase } from '$utils/database';

	async function signup() {
		let { user, error } = await supabase.auth.signUp({
			email: 'someone@email.com',
			password: 'yWAdsHsaZfsXbZrsXXoF'
		})
	}
</script>


<form on:submit|preventDefault={signup}>
	<label for="username">Courriel</label>
	<input name="username" id="username" type="text">
	<label for="password">Mot de passe</label>
	<input name="password" id="password" type="text">
	<button type="submit">Soumettre</button>
</form>

<p>Ou</p>

<button>Google</button>
<button>Linkedin</button>
<button>Facebook</button>




<style lang="postcss">
	input[type='text'] {
		border: none;
		outline: none;
		padding: get(md);
		background: red;
	}
</style>