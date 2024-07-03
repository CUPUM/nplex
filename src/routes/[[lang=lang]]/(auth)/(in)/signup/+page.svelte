<script lang="ts">
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { Eye, EyeOff, LogIn, ShieldQuestion, UserRoundPlus } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let { data } = $props();

	let showPassword = $state(false);
	let buttonRef = $state<HTMLButtonElement>();

	const { form, enhance, constraints, errors, submitter } = extendedSuperForm(data.form, {
		taintedMessage: null,
	});
</script>

<form method="POST" use:enhance autocomplete="off" class="gap-gap flex flex-col">
	<h1 class="mb-gap text-xl font-semibold">
		{m.signup_create_account()}
	</h1>
	<Field>
		{#snippet label()}
			{m.email()}
		{/snippet}
		<input
			in:fly={{ y: -6 }}
			class="input"
			type="email"
			name="email"
			aria-invalid={$errors.email ? true : undefined}
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
				in:fly={{ y: -6, delay: 75 }}
				class="input"
				type={showPassword ? 'text' : 'password'}
				name="password"
				aria-invalid={$errors.password ? true : undefined}
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
	<Field>
		{#snippet label()}
			{m.password_confirmation()}
		{/snippet}
		<input
			in:fly={{ y: -6, delay: 150 }}
			class="input"
			type={showPassword ? 'text' : 'password'}
			name="confirmPassword"
			aria-invalid={$errors.confirmPassword ? true : undefined}
			bind:value={$form.confirmPassword}
			{...$constraints.confirmPassword}
		/>
	</Field>
	<button class="button button-cta" type="submit" use:ripple bind:this={buttonRef}>
		<IconSpinner icon={UserRoundPlus} busy={$submitter === buttonRef} />
		{m.signup()}
	</button>
</form>
<nav class="gap-input-group-gap flex flex-row flex-wrap justify-between text-sm">
	<a class="button button-ghost" {...linkAttributes('/login')}>
		<LogIn />
		{m.auth_login_prompt()}
	</a>
	<a class="button button-ghost" {...linkAttributes('/reset-password')}>
		{m.auth_forgot_password_prompt()}
		<ShieldQuestion />
	</a>
</nav>
