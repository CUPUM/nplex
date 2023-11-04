<script lang="ts">
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';
	import { FileUp, ShieldX } from 'lucide-svelte';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			title: 'Paramètres de compte',
			uploadAvatar: 'Importer un avatar',
			firstName: 'Prénom',
			middleName: 'Surnom',
			lastName: 'Nom de famille',
			publicEmail: 'Courriel public',
			verify: 'Authentifier',
			verifiedPublicEmail: (verified: boolean) =>
				`Courriel public ${verified ? 'vérifié' : 'non-vérifié'}`,
		},
		en: {
			title: 'Account settings',
			uploadAvatar: 'Import an avatar image',
			firstName: 'First name',
			middleName: 'Middle name',
			lastName: 'Last name',
			publicEmail: 'Public email',
			verify: 'Verify',
			verifiedPublicEmail: (verified: boolean) =>
				`${verified ? 'Verified' : 'Unverified'} public email`,
		},
	});

	export let data: PageData['generalForm'];

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
	<DashboardFormSection>
		<button class="button outlined" disabled type="submit" formaction="?/uploadAvatar">
			{$t.uploadAvatar}<FileUp class="button-icon" />
		</button>
	</DashboardFormSection>
	<DashboardFormSection>
		<label class="labeled-input">
			<input
				type="text"
				name="firstName"
				class="input"
				bind:value={$form.firstName}
				{...$states.firstName}
				placeholder={$t.firstName}
			/>
		</label>
		<label class="labeled-input">
			<input
				type="text"
				name="middleName"
				class="input"
				bind:value={$form.middleName}
				{...$states.middleName}
				placeholder={$t.middleName}
			/>
		</label>
		<label class="labeled-input">
			<input
				type="text"
				name="lastName"
				class="input"
				bind:value={$form.lastName}
				{...$states.lastName}
				placeholder={$t.lastName}
			/>
		</label>
	</DashboardFormSection>
	<DashboardFormSection>
		<label class="input-group">
			<ShieldX class="input-icon" />
			<input
				type="email"
				name="publicEmail"
				class="input"
				bind:value={$form.publicEmail}
				placeholder={$t.publicEmail}
			/>
			<div class="input-peer">
				<button class="button" formaction="?/verifyEmail" disabled>
					{$t.verify}
				</button>
			</div>
		</label>
	</DashboardFormSection>
	<DashboardMenu {tainted} {submitter}></DashboardMenu>
</DashboardForm>

<style lang="postcss">
</style>
