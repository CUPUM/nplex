<script lang="ts">
	import { enhance } from '$app/forms';
	import { createTranslations } from '$lib/i18n/translate';
	import { MailWarning } from 'lucide-svelte';

	const t = createTranslations({
		fr: {
			title: 'Confirmez votre adresse courriel',
			body: 'Votre compte a été créé avec succès! Cependant, vous devrez confirmer votre adresse courriel pour débloquer certaines fonctionnalités. Vous devriez recevoir un courriel avec un lien qui vous permettra de confirmez l’authenticité de votre adresse courriel. Veuillez voir votre boîte de courriel.',
			missing: 'Vous n’avez pas reçu le courriel?',
			resend: 'Demandez un nouveau courriel de vérification',
		},
		en: {
			title: 'Confirm your email address',
			body: 'Your account is now created! However, you will need to confirm your email adress in order to unlock certain features. You should be receiving an email containing a link that will allow you to authentify your email address. Please look at your mailbox.',
			missing: 'You didn’t receive an email?',
			resend: 'Request a new verification email',
		},
	});
</script>

<article>
	<h1>{$t.title}</h1>
	<p>{$t.body}</p>
	<form use:enhance method="POST">
		<p>{$t.missing}</p>
		<button class="button" type="submit"><MailWarning class="button-icon" />{$t.resend}</button>
	</form>
</article>

<style lang="scss">
	article {
		align-self: center;
		gap: 1rem;
		max-width: var(--width-center);
		padding: 1rem;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		flex-direction: column;
	}

	form {
		.button {
			font-size: var(--size-sm);
		}
	}
</style>
