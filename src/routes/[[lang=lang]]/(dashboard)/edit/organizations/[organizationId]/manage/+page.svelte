<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
</script>

<DashboardSubHeader>
	<h2>{m.organization_sharing_and_management()}</h2>
</DashboardSubHeader>
<DashboardSubSection>
	{#snippet header()}
		<h3>{m.organization_visibility()}</h3>
	{/snippet}
	Control organization visibility
</DashboardSubSection>
<DashboardSubSection>
	{#snippet header()}
		<h3>{m.organization_danger()}</h3>
	{/snippet}
	<button class="button button-cta" data-danger>{m.del()}</button>
</DashboardSubSection>
