<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button/Button.svelte';
	import { authModal, AUTHMODAL_MODE } from '$routes/AuthModal.svelte';
</script>

<article>
	<section>
		<h1>Oops!</h1>
		<p>
			{$page.error?.message ??
				'Le projet que vous tentez de consulter ne semble pas exister ou être disponible.'}
		</p>
	</section>
	<section>
		<p>
			Vous détenez un compte
			<Button
				class="text-sm"
				href={authModal.getUrl({ url: $page.url, mode: AUTHMODAL_MODE.SignIn }).toString()}
			>
				Connectez-vous
			</Button>
			pour accéder à vos projets privés ou pour créer de nouvelles fiches!
		</p>
		<p>
			Sinon
			<Button
				class="text-sm"
				href={authModal.getUrl({ url: $page.url, mode: AUTHMODAL_MODE.SignUp }).toString()}
			>
				Créez-vous un compte
			</Button>
			et profitez dès maintenant des fonctionnalités de Nplex!
		</p>
	</section>
</article>

<style lang="scss">
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--ui-nav-h) var(--ui-gutter-lg);
		height: 100vh;
		width: 100%;
	}
</style>
