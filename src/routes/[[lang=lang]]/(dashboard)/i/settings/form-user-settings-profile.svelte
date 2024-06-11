<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { extendSuperForm } from '$lib/crud/form/client';
	import { Check, FileUp, Mail, Shield, ShieldX } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { form, enhance, constraints, tainted, submitter, submitting, isTainted } = extendSuperForm(
		superForm(data.profileForm, { dataType: 'json', invalidateAll: 'force' })
	);

	let submitRef = $state<HTMLButtonElement>();
</script>

<form use:enhance method="POST" action="?/profile" class="dashboard-section">
	<h2 class="dashboard-section-title">
		{m.user_profile_settings()}
	</h2>
	<div class="dashboard-section-content">
		<div class="gap-gutter flex flex-row">
			<label class="field flex-1">
				<span class="field-label">{m.user_first_name()}</span>
				<input
					type="text"
					class="input input-bordered"
					bind:value={$form.firstName}
					{...$constraints.firstName}
				/>
			</label>
			<label class="field flex-1">
				<span class="field-label">{m.user_middle_name()}</span>
				<input
					type="text"
					class="input input-bordered"
					bind:value={$form.middleName}
					{...$constraints.middleName}
				/>
			</label>
		</div>
		<label class="field">
			<span class="field-label">{m.user_last_name()}</span>
			<input
				type="text"
				class="input input-bordered"
				bind:value={$form.lastName}
				{...$constraints.lastName}
			/>
		</label>
		<label class="field self-start">
			<span class="field-label">{m.user_avatar()}</span>
			<fieldset class="input-group">
				<FileUp />
				<input
					placeholder={m.user_upload_avatar()}
					type="file"
					class="input"
					id="avatar-button"
					formaction="?/avatar"
				/>
			</fieldset>
		</label>
		<fieldset class="field" disabled>
			<legend class="field-label">{m.user_public_email()}</legend>
			<label class="input-group input-bordered">
				{#if $page.data.user?.emailVerified}
					<Shield class="input-icon" style="color: var(--color-success-500)" />
				{:else}
					<ShieldX class="input-icon" style="color: var(--color-error-500)" />
				{/if}
				<input
					type="email"
					name="publicEmail"
					class="input"
					bind:value={$form.publicEmail}
					placeholder={m.user_public_email()}
				/>
				<div class="input-peer">
					<button class="button" formaction="?/verify">
						<Mail />
						{m.user_verify()}
					</button>
				</div>
			</label>
		</fieldset>
		<button
			class="button button-cta"
			type="submit"
			bind:this={submitRef}
			disabled={!isTainted($tainted)}
		>
			<IconSpinner icon={Check} busy={submitRef === $submitter} />{m.save()}
		</button>
	</div>
</form>
