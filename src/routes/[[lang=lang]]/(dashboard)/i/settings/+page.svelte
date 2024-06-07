<script lang="ts">
	import FormUserSettingsProfile from './form-user-settings-profile.svelte';

	let { data } = $props();
</script>

<FormUserSettingsProfile {data} />

<!-- <SettingsPermissions data={data.permissionsForm} USER_ROLES={data.USER_ROLES} /> -->
<!-- <SettingsDelete data={data.manageForm} /> -->

<!-- 
<DashboardForm {enhance} action="?/update">
	<svelte:fragment slot="header">
		<h1 class="heading lg">{$t.dangerZone.title}</h1>
	</svelte:fragment>
	<DashboardFormField>
		<button class="button" disabled>Reset password</button>
		<button class="button" disabled>Change email</button>
		<button class="button danger" type="submit" formaction="?/delete">
			<UserX2 class="button-icon" />{$t.dangerZone.delete}
		</button>
	</DashboardFormField>
</DashboardForm> -->

<style>
</style>
