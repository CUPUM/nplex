<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import { superForm } from '$lib/crud/validation/forms/super-form';
	import { FileUp, Mail, Shield, ShieldX } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData['generalForm'];
	export let publicEmailVerified: PageData['publicEmailVerified'];

	const {
		form,
		enhance,
		states,
		tainted,
		elements: {
			submitter: { root: submitter },
		},
	} = superForm(data);
</script>

<DashboardForm {enhance} action="?/update" {tainted} {submitter}>
	<svelte:fragment slot="header">
		<h2>
			{m.user_settings()}
		</h2>
	</svelte:fragment>
	<DashboardFormSection title={m.user_name()}>
		<fieldset id="user-name">
			<input
				type="text"
				name="firstName"
				class="input"
				bind:value={$form.firstName}
				{...$states.firstName}
				placeholder={m.user_first_name()}
			/>
			<input
				type="text"
				name="middleName"
				class="input"
				bind:value={$form.middleName}
				{...$states.middleName}
				placeholder={m.user_middle_name()}
			/>
		</fieldset>
		<input
			type="text"
			name="lastName"
			class="input"
			bind:value={$form.lastName}
			{...$states.lastName}
			placeholder={m.user_last_name()}
		/>
	</DashboardFormSection>
	<DashboardFormSection title={m.user_avatar()}>
		<button
			class="button outlined"
			id="avatar-button"
			disabled
			type="submit"
			formaction="?/uploadAvatar"
		>
			{m.user_upload_avatar()}
			<FileUp class="button-icon" />
		</button>
	</DashboardFormSection>
	<DashboardFormSection title={m.user_public_email()}>
		<label class="input-group">
			{#if publicEmailVerified}
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
				<button class="button" formaction="?/verifyEmail" disabled>
					<Mail class="button-icon" />
					{m.user_verify()}
				</button>
			</div>
		</label>
	</DashboardFormSection>
</DashboardForm>

<style>
	#user-name {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		flex-wrap: wrap;
		.input {
			flex: 1;
		}
	}

	#avatar-button {
		align-self: center;
	}
</style>
