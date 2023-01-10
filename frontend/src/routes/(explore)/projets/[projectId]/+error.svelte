<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import { authModal, AUTHMODAL_MODE } from '$routes/AuthModal.svelte';
</script>

<article>
	Oops le projet que vous tentez de voir... - [n'existe pas] - [est privé et vous ne semblez pas y
	avoir accès]
	<p>
		Vous détenez un compte?
		<Button href={authModal.getUrl({ url: $page.url, mode: AUTHMODAL_MODE.SignIn }).toString()}>
			Connectez-vous
		</Button>
	</p>
	<p>
		Sinon,
		<Button href={authModal.getUrl({ url: $page.url, mode: AUTHMODAL_MODE.SignUp }).toString()}>
			Créez-vous un compte
		</Button>
	</p>
</article>

<style lang="scss">
</style>
