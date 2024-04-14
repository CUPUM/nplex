<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { LogIn, Send, UserPlus2 } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, enhance, constraints, errors, message } = superForm(data.form);
</script>

<form use:enhance method="POST">
	<h1 class="h4">
		<LangKey>
			{m.auth_resetPasswordTitle()}
		</LangKey>
	</h1>
	<label class="label-group">
		<span class="label" in:fly={{ y: 6 }}>
			<LangKey>
				{m.email()}
			</LangKey>
		</span>
		<input
			in:fly={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			aria-invalid={$errors.email ? true : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	<button in:fly={{ y: -6, delay: 75 }} class="button cta center" type="submit">
		<Send class="button-icon" />
		<LangKey>
			{m.reset()}
		</LangKey>
	</button>
</form>
<div class="links">
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button link center" {...$link('/login')}>
		<LogIn class="button-icon" />
		<LangKey>
			{m.auth_loginPrompt()}
		</LangKey>
	</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button link center" {...$link('/signup')} in:fade|global>
		<UserPlus2 class="button-icon" />
		<LangKey>
			{m.auth_signupPrompt()}
		</LangKey>
	</a>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		align-self: center;
		justify-content: center;
		flex: 1;
		gap: 1rem;

		h1 {
			text-align: center;
		}
	}

	.links {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--base-gutter);
		justify-content: space-between;
		font-size: var(--size-sm);

		.button {
			flex: 1;
		}
	}
</style>
