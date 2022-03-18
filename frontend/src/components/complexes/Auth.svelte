<script lang="ts">
	import { clickoutside } from '$actions/clickoutside';

	import { session } from '$app/stores';

	import Field from '$components/primitives/Field.svelte';
	import FieldSet from '$components/primitives/FieldSet.svelte';
	import { authModal } from '$stores/auth';
	import { db } from '$utils/database';

	function close() {
		$authModal = false;
	}

	async function signup() {
		try {
			const res = await db.auth.signUp({ email, password });
			if (res.error) throw res.error;
		} catch (error) {
			alert(error);
		} finally {
			//
		}
	}

	async function signin() {
		const res = await db.auth.signIn({ email, password });
	}

	let email: string;
	let password: string;
</script>

<div>
	<form method="post" use:clickoutside on:clickoutside={close}>
		<FieldSet>
			<Field placeholder="Nom d'utilisateur" name="email" />
		</FieldSet>
		<FieldSet>
			<Field placeholder="Mot de passe" name="password" />
		</FieldSet>
		<button type="submit" formaction="/api/auth/signin">Se connecter</button>
		<p>ou</p>
		<button type="submit" formaction="/api/auth/signup">Créer un compte</button>
		<p>ou utiliser</p>
		<button>Linkedin</button>
		<button>Facebook</button>
		<button>Google</button>
		<button>Twitter</button>
	</form>
</div>

<style lang="postcss">
	div {
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: var(--color-light-900);
		opacity: 0.9;
	}

	form {
		background-color: var(--color-light-100);
	}
</style>
