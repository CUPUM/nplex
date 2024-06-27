<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
</script>

<DashboardSubSection>
	{#snippet header()}
		<h3>{m.project_visibility()}</h3>
	{/snippet}
	<p>Visibilité</p>
</DashboardSubSection>
