<script lang="ts">
	import GeneralSettings from './GeneralSettings.svelte';
	import PermissionsSettings from './PermissionsSettings.svelte';

	export let data;
</script>

<GeneralSettings data={data.generalForm} publicEmailVerified={data.publicEmailVerified} />
<PermissionsSettings data={data.permissionsForm} roles={data.roles} />

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
