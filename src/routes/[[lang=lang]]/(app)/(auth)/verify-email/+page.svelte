<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { MailWarning } from 'lucide-svelte';
</script>

<article>
	<h1>
		<LangKey>{m.verifyEmail_title()}</LangKey>
	</h1>
	<p><LangKey>{m.verifyEmail_body()}</LangKey></p>
	<form use:enhance method="POST">
		<p><LangKey>{m.verifyEmail_notReceived()}</LangKey></p>
		<button class="button" type="submit">
			<MailWarning class="button-icon" /><LangKey>{m.verifyEmail_resend()}</LangKey>
		</button>
	</form>
</article>

<style lang="postcss">
	article {
		align-self: center;
		gap: 1rem;
		max-width: var(--width-sm);
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
