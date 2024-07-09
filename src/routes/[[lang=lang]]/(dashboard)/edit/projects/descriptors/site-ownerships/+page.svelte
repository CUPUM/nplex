<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import SiteOwnershipCreate from './site-ownership-create.svelte';
	import SiteOwnership from './site-ownership.svelte';

	let { data } = $props();

	const listForm = extendedSuperForm(data.listForm, {
		invalidateAll: true,
	});

	const { formId, enhance } = listForm;
</script>

<DashboardSubHeader>
	<h2>{m.project_ownership_types()}</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
		consequatur amet blanditiis sed alias. Eum, numquam magnam!
	</p>
</DashboardSubHeader>
<DashboardSubSection>
	<form id={$formId} class="sr-only" use:enhance method="POST"></form>
	<ul class="gap-gap flex flex-row flex-wrap">
		<li>
			<SiteOwnershipCreate {listForm} data={data.createForm} />
		</li>
		{#each data.forms as ownership, i (ownership.id)}
			<li>
				<SiteOwnership {ownership} {listForm} />
			</li>
		{/each}
	</ul>
</DashboardSubSection>
