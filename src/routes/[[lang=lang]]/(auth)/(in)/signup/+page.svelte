<script lang="ts">
	import * as m from '$i18n/messages';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { Eye, EyeOff, HelpCircle, LogIn, UserPlus2 } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';

	let { data } = $props();

	let showPassword = $state(false);

	const { form, enhance, constraints, errors } = superForm(data.form, {
		taintedMessage: null,
	});
</script>

<form method="POST" use:enhance autocomplete="off" class="gap-gutter flex flex-col">
	<h1 class="pb-gutter text-xl font-bold">
		{m.signup_create_account()}
	</h1>
	<label class="field">
		<span class="field-label" in:fly={{ y: 6 }}>
			{m.email()}
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
	<label class="field">
		<span class="field-label" in:fly={{ y: 6, delay: 75 }}>
			{m.password()}
		</span>
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
	</label>
	<label class="field">
		<span class="field-label" in:fly={{ y: 6, delay: 150 }}>
			{m.password_confirmation()}
		</span>
		<input
			in:fly={{ y: -6, delay: 150 }}
			class="input"
			type={showPassword ? 'text' : 'password'}
			name="confirmPassword"
			aria-invalid={$errors.confirmPassword ? true : undefined}
			bind:value={$form.confirmPassword}
			{...$constraints.confirmPassword}
		/>
	</label>
	<button in:fly={{ y: -6, delay: 225 }} class="button button-cta" type="submit" use:ripple>
		<UserPlus2 class="button-icon" />
		{m.signup()}
	</button>
</form>
<nav class="gap-menu-gutter flex flex-row flex-wrap justify-between text-sm">
	<a class="button button-link" {...linkAttributes('/login')}>
		<LogIn class="button-icon" />
		{m.auth_login_prompt()}
	</a>
	<a class="button button-link" {...linkAttributes('/reset-password')}>
		<HelpCircle class="button-icon" />
		{m.auth_forgot_password_prompt()}
	</a>
</nav>
