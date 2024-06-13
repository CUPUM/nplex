<script lang="ts">
	import * as m from '$i18n/messages';
	import Spinner from '$lib/components/primitives/spinner.svelte';
	import type { ExtendedSuperFormData } from '$lib/crud/form/client';
	import type { PageData } from './$types';

	let {
		siteOwnerships,
		form,
	}: ExtendedSuperFormData<PageData['form']> & Pick<PageData, 'siteOwnerships'> = $props();
</script>

<fieldset class="dashboard-section">
	<legend class="dashboard-section-title">
		{m.project_ownership_type()}
	</legend>
	<div class="dashboard-section-content">
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
	</div>
</fieldset>
