<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import Spinner from '$lib/components/primitives/spinner.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let {
		siteOwnerships,
		form,
	}: ExtendedSuperFormData<PageData['form']> & Pick<PageData, 'siteOwnerships'> = $props();
</script>

<DashboardSubSection>
	{#snippet header()}
		<h4>
			{m.project_ownership_type()}
		</h4>
	{/snippet}
	{#await siteOwnerships}
		<Spinner />
	{:then awaitedSiteOwnerships}
		{#each awaitedSiteOwnerships as ownership}
			<label>
				<input type="radio" bind:group={$form.siteOwnershipId} value={ownership.id} />
				{ownership.title}
			</label>
		{/each}
	{/await}
</DashboardSubSection>
