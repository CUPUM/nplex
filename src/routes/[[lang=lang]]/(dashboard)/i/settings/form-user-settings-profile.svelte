<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import Field from '$lib/components/primitives/field.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { Check, FileUp, Mail, Shield, ShieldX } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { form, enhance, constraints, tainted, submitter, submitting, isTainted } =
		extendedSuperForm(data.profileForm, { dataType: 'json', invalidateAll: 'force' });

	let submitRef = $state<HTMLButtonElement>();
</script>

<form use:enhance method="POST" action="?/profile" class="dashboard-section">
	<h2 class="dashboard-section-title">
		{m.user_profile_settings()}
	</h2>
	<div class="dashboard-section-content">
		<div class="gap-gutter flex flex-row">
			<Field class="flex-1">
				{#snippet label()}
					{m.user_first_name()}
				{/snippet}
				<input
					type="text"
					class="input input-bordered"
					bind:value={$form.firstName}
					{...$constraints.firstName}
				/>
			</Field>
			<Field class="flex-1">
				{#snippet label()}
					{m.user_middle_name()}
				{/snippet}
				<input
					type="text"
					class="input input-bordered"
					bind:value={$form.middleName}
					{...$constraints.middleName}
				/>
			</Field>
		</div>
		<Field>
			{#snippet label()}
				{m.user_last_name()}
			{/snippet}
			<input
				type="text"
				class="input input-bordered"
				bind:value={$form.lastName}
				{...$constraints.lastName}
			/>
		</Field>
		<Field class="self-start">
			{#snippet label()}
				{m.user_avatar()}
			{/snippet}
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
		</Field>
		<Field as="fieldset" aria-disabled>
			{#snippet label()}
				{m.user_public_email()}
			{/snippet}
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
		</Field>
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
