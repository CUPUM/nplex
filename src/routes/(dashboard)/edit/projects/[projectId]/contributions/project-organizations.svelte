<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import type { PageData } from './$types';
	import OrganizationAdd from './organization-add.svelte';

	let { lists }: Pick<PageData, 'lists'> = $props();
</script>

<DashboardSubSection>
	{#snippet header()}
		<h3>{m.organizations()}</h3>
	{/snippet}
	<form action=""></form>
	<OrganizationAdd />
</DashboardSubSection>
