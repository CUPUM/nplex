<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import ProjectOrganizations from './project-organizations.svelte';

	let { data } = $props();
</script>

<DashboardSubHeader>
	<h2>{m.project_contributions()}</h2>
</DashboardSubHeader>
<ProjectOrganizations {...data} />
