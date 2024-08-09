<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
</script>

<DashboardSubHeader>
	<h1>
		{m.organization_descriptors()}
	</h1>
</DashboardSubHeader>
