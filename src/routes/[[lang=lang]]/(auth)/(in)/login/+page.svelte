<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendSuperForm } from '$lib/crud/form/client.js';
	import { Eye, EyeOff, Lock, LogIn, UserRoundPlus } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	let showPassword = $state(false);
	let loginRef = $state<HTMLButtonElement>();

	const { form, enhance, constraints, errors, tainted, message, submitter } = extendSuperForm(
		superForm(data.form, {
			taintedMessage: null,
		})
	);
</script>

<form method="POST" use:enhance autocomplete="off" class="gap-gutter flex flex-col">
	<h1 class="pb-gutter text-2xl font-semibold">
		{m.auth_login_title()}
	</h1>
	<label class="field">
		<span class="field-label" in:fly|global={{ y: 6 }}>
			{m.email()}
		</span>
		<input
			in:fly|global={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			aria-invalid={$errors.email || ($page.status >= 400 && !$tainted?.email) ? true : undefined}
			bind:value={$form.email}
			{...$constraints.email}
		/>
	</label>
	<label class="field">
		<span class="field-label" in:fly|global={{ y: 6, delay: 75 }}>
			{m.password()}
		</span>
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
	</label>
	<button
		in:fly|global={{ y: -6, delay: 150 }}
		class="button button-cta"
		type="submit"
		use:ripple
		bind:this={loginRef}
	>
		<IconSpinner icon={LogIn} busy={$submitter === loginRef} />
		{m.login()}
	</button>
	{#if typeof $message === 'string'}
		<p class="text-base-dim text-sm" in:fly={{ y: -8, duration: 350 }}>{$message}</p>
	{/if}
</form>
<nav class="gap-menu-gutter flex flex-row flex-wrap justify-between text-sm">
	<a class="button button-link" {...linkAttributes('/signup')}>
		<UserRoundPlus />
		{m.auth_signup_prompt()}
	</a>
	<a class="button button-link" {...linkAttributes('/reset-password')}>
		{m.auth_forgot_password_prompt()}
		<Lock />
	</a>
</nav>
