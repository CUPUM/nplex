<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/crud/validation/forms/super-form.js';
	import { link } from '$lib/i18n/location.js';
	import { melt } from '@melt-ui/svelte';
	import { Eye, EyeOff, HelpCircle, LogIn, UserPlus2 } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	const STAGGER = 75;

	export let data;

	let showPassword = false;
	let loginRef: HTMLButtonElement;

	const {
		form,
		enhance,
		constraints,
		errors,
		elements: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, {
		taintedMessage: null,
	});
</script>

<form method="POST" use:enhance autocomplete="off">
	<h1 class="h4">
		<LangKey>
			{m.auth_login_title()}
		</LangKey>
	</h1>
	<label class="label-group">
		<span class="label" in:fly|global={{ y: 6 }}>
			<LangKey>
				{m.email()}
			</LangKey>
		</span>
		<input
			in:fly|global={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			placeholder="{$langKey(m.email().toLowerCase())}@..."
			aria-invalid={$errors.email ? true : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	<label class="label-group">
		<span class="label" in:fly|global={{ y: 6, delay: STAGGER }}>
			<LangKey>
				{m.password()}
			</LangKey>
		</span>
		<div class="input-group">
			<input
				in:fly|global={{ y: -6, delay: STAGGER }}
				class="input"
				type={showPassword ? 'text' : 'password'}
				name="password"
				aria-invalid={$errors.password ? true : undefined}
				on:input={(e) => {
					if (e.target instanceof HTMLElement && 'value' in e.target) {
						$form.password = String(e.target.value);
					}
				}}
				value={$form.password}
				{...$constraints.password}
			/>
			<div class="input-peer">
				<button
					class="button square ghost"
					type="button"
					on:click={() => (showPassword = !showPassword)}
				>
					{#if showPassword}
						<div in:fly={{ x: -8 }}>
							<EyeOff class="button-icon" />
						</div>
					{:else}
						<div in:fly={{ x: 8 }}>
							<Eye class="button-icon" />
						</div>
					{/if}
				</button>
			</div>
		</div>
	</label>
	<button
		in:fly|global={{ y: -6, delay: 2 * STAGGER }}
		class="button cta center"
		type="submit"
		use:ripple
		bind:this={loginRef}
		use:melt={$submitter(loginRef)}
	>
		<LogIn class="button-icon" />
		<LangKey>
			{m.login()}
		</LangKey>
	</button>
</form>
<div class="links">
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button link center" {...$link('/signup')} in:fade|global>
		<UserPlus2 class="button-icon" />
		<LangKey>
			{m.auth_signup_prompt()}
		</LangKey>
	</a>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a class="button link center" {...$link('/reset-password')} in:fade|global>
		<HelpCircle class="button-icon" />
		<LangKey>
			{m.auth_forgot_password_prompt()}
		</LangKey>
	</a>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: stretch;
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
