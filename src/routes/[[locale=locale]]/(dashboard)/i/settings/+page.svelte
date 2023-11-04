<script lang="ts">
	import { createTranslations } from '$lib/i18n/translate';
	import GeneralSettings from './GeneralSettings.svelte';
	import PermissionsSettings from './PermissionsSettings.svelte';

	const t = createTranslations({
		fr: {
			permissions: {
				title: 'Rôle & permissions',
				changeRole: 'Changer de rôle',
				requestRole: 'Envoyer la requête',
			},
			dangerZone: {
				title: 'Zone à risque',
				delete: 'Supprimer mon compte',
			},
		},
		en: {
			permissions: {
				title: 'Role & permissions',
				changeRole: 'Change role',
				requestRole: 'Send request',
			},
			dangerZone: {
				title: 'Danger zone',
				delete: 'Delete account',
			},
		},
	});

	export let data;
</script>

<GeneralSettings data={data.generalForm} />
<PermissionsSettings data={data.permissionsForm} roles={data.roles} />

<!-- 
<DashboardForm {enhance} action="?/update">
	<svelte:fragment slot="header">
		<h1 class="heading lg">{$t.dangerZone.title}</h1>
	</svelte:fragment>
	<DashboardFormSection>
		<button class="button" disabled>Reset password</button>
		<button class="button" disabled>Change email</button>
		<button class="button danger" type="submit" formaction="?/delete">
			<UserX2 class="button-icon" />{$t.dangerZone.delete}
		</button>
	</DashboardFormSection>
</DashboardForm> -->

<style lang="postcss">
</style>
