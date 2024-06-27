<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
</script>

<DashboardSubSection>
	{#snippet header()}
		<h3>{m.project_sharing()}</h3>
	{/snippet}
	<p>Partage</p>
	<p>Transfert du projet</p>
</DashboardSubSection>
