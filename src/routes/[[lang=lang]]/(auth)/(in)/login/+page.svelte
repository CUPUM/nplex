<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client.js';
	import { Eye, EyeOff, LogIn, ShieldQuestion, UserRoundPlus } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let { data } = $props();

	let showPassword = $state(false);
	let loginRef = $state<HTMLButtonElement>();

	const { form, enhance, constraints, errors, tainted, message, submitter } = extendedSuperForm(
		data.form,
		{
			taintedMessage: null,
		}
	);
</script>

<form method="POST" use:enhance autocomplete="off" class="gap-sm flex flex-col">
	<h1 class="mb-md text-xl font-bold">
		{m.auth_login_title()}
	</h1>
	<Field>
		{#snippet label()}
			{m.email()}
		{/snippet}
		<input
			in:fly|global={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			aria-invalid={$errors.email || ($page.status >= 400 && !$tainted?.email) ? true : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</Field>
	<Field>
		{#snippet label()}
			{m.password()}
		{/snippet}
		<div class="input-group">
			<input
				in:fly|global={{ y: -6, delay: 75 }}
				class="input"
				type={showPassword ? 'text' : 'password'}
				name="password"
				aria-invalid={$errors.password || ($page.status >= 400 && !$tainted?.password)
					? true
					: undefined}
				bind:value={$form.password}
				{...$constraints.password}
			/>
			<div class="input-peer">
				<button
					class="button button-ghost aspect-square overflow-hidden"
					type="button"
					use:ripple
					onclick={(e) => {
						showPassword = !showPassword;
					}}
				>
					{#if showPassword}
						<div
							class="pointer-events-none absolute"
							transition:fly={{ y: 25, duration: 350, easing: expoOut }}
						>
							<EyeOff />
						</div>
					{:else}
						<div
							class="pointer-events-none absolute"
							transition:fly={{ y: -25, duration: 350, easing: expoOut }}
						>
							<Eye />
						</div>
					{/if}
				</button>
			</div>
		</div>
	</Field>
	<button class="button button-cta" type="submit" use:ripple bind:this={loginRef}>
		<IconSpinner icon={LogIn} busy={$submitter === loginRef} />
		{m.login()}
	</button>
	{#if typeof $message === 'string'}
		<p class="opacity-soft text-base text-sm" in:fly={{ y: -8, duration: 350 }}>{$message}</p>
	{/if}
</form>
<nav class="gap-input-group-gap flex flex-row flex-wrap justify-between text-sm">
	<a class="button button-ghost" {...linkAttributes('/signup')} use:ripple>
		<UserRoundPlus />
		{m.auth_signup_prompt()}
	</a>
	<a class="button button-ghost" {...linkAttributes('/reset-password')} use:ripple>
		{m.auth_forgot_password_prompt()}
		<ShieldQuestion />
	</a>
</nav>
