<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';

	let { data } = $props();
</script>

<DashboardSubHeader>
	<h2>{m.building_metadata()}</h2>
</DashboardSubHeader>
<DashboardSubSection>
	{m.coming_soon()}
</DashboardSubSection>
