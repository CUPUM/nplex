<script lang="ts">
	import FormUserSettingsAccount from './form-user-settings-account.svelte';
	import FormUserSettingsProfile from './form-user-settings-profile.svelte';

	let { data } = $props();
</script>

<FormUserSettingsProfile {data} />
<FormUserSettingsAccount {data} />
