<script lang="ts">
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardMenu from '$lib/components/DashboardFormMenu.svelte';
	import DashboardFormField from '$lib/components/DashboardFormSection.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';
	import { FileUp, Mail, Shield, ShieldX } from 'lucide-svelte';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			title: 'Paramètres de compte',
			name: 'Nom',
			firstName: 'Prénom',
			middleName: 'Surnom',
			lastName: 'Nom de famille',
			avatar: 'Avatar',
			uploadAvatar: 'Importer une image',
			publicEmail: 'Courriel public',
			verify: 'Authentifier',
			verifiedPublicEmail: (verified: boolean) =>
				`Courriel public ${verified ? 'vérifié' : 'non-vérifié'}`,
		},
		en: {
			title: 'Account settings',
			name: 'Name',
			firstName: 'First name',
			middleName: 'Middle name',
			lastName: 'Last name',
			avatar: 'Avatar',
			uploadAvatar: 'Import an image',
			publicEmail: 'Public email',
			verify: 'Verify',
			verifiedPublicEmail: (verified: boolean) =>
				`${verified ? 'Verified' : 'Unverified'} public email`,
		},
	});

	export let data: PageData['generalForm'];
	export let publicEmailVerified: PageData['publicEmailVerified'];

	const {
		form,
		enhance,
		states,
		tainted,
		loadable: {
			submitter: { root: submitter },
		},
	} = superForm(data);
</script>

<DashboardForm {enhance} action="?/update">
	<svelte:fragment slot="header">
		<h1 class="heading lg">{$t.title}</h1>
	</svelte:fragment>
	<DashboardFormField title={$t.name} centered>
		<fieldset id="user-name">
			<input
				type="text"
				name="firstName"
				class="input"
				bind:value={$form.firstName}
				{...$states.firstName}
				placeholder={$t.firstName}
			/>
			<input
				type="text"
				name="middleName"
				class="input"
				bind:value={$form.middleName}
				{...$states.middleName}
				placeholder={$t.middleName}
			/>
		</fieldset>
		<input
			type="text"
			name="lastName"
			class="input"
			bind:value={$form.lastName}
			{...$states.lastName}
			placeholder={$t.lastName}
		/>
	</DashboardFormField>
	<DashboardFormField centered title={$t.avatar}>
		<button
			class="button outlined"
			id="avatar-button"
			disabled
			type="submit"
			formaction="?/uploadAvatar"
		>
			{$t.uploadAvatar}<FileUp class="button-icon" />
		</button>
	</DashboardFormField>
	<DashboardFormField title={$t.publicEmail} centered>
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
				placeholder={$t.publicEmail}
			/>
			<div class="input-peer">
				<button class="button" formaction="?/verifyEmail" disabled>
					<Mail class="button-icon" />
					{$t.verify}
				</button>
			</div>
		</label>
	</DashboardFormField>
	<DashboardMenu {tainted} {submitter}></DashboardMenu>
</DashboardForm>

<style lang="postcss">
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
