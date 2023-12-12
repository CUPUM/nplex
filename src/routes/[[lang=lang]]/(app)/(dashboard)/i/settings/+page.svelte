<script lang="ts">
	import SettingsGeneral from './SettingsGeneral.svelte';
	import SettingsDelete from './SettingsManage.svelte';
	import SettingsPermissions from './SettingsPermissions.svelte';

	export let data;
</script>

<SettingsGeneral data={data.generalForm} publicEmailVerified={data.publicEmailVerified} />
<SettingsPermissions data={data.permissionsForm} roles={data.roles} />
<SettingsDelete data={data.manageForm} />

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

<style lang="postcss">
</style>
