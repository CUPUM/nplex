<script lang="ts">
	import { enhance } from '$app/forms';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			title: 'Confirmez votre adresse courriel',
			body: 'Vous devriez recevoir un courriel avec un lien qui vous permettra de confirmez l’authenticité de votre adresse courriel. Veuillez voir votre boîte de courriel.',
			missing: 'Vous n’avez pas reçu le courriel?',
			resend: 'Demandez un nouveau courriel de vérification',
		},
		en: {
			title: 'Confirm your email address',
			body: 'You should be receiving an email containing a link that will allow you to authentify your email address. Please look at your mailbox.',
			missing: 'You didn’t receive an email?',
			resend: 'Request a new verification email',
		},
	});
</script>

<article>
	<h1>{$t.title}</h1>
	<p>{$t.body}</p>
</article>
<form use:enhance method="POST">
	<p>{$t.missing}</p>
	<button type="submit">{$t.resend}</button>
</form>

<style lang="scss">
</style>
