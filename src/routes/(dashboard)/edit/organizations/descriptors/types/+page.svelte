<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSubHeader from '$lib/components/patterns/dashboard-sub-header.svelte';
	import DashboardSubSection from '$lib/components/patterns/dashboard-sub-section.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import OrganizationTypeCreate from './organization-type-create.svelte';
	import OrganizationType from './organization-type.svelte';

	let { data } = $props();

	const organizationTypesForm = extendedSuperForm(data.organizationTypesForm, {
		invalidateAll: true,
	});

	const { formId, enhance } = organizationTypesForm;
</script>

<DashboardSubHeader>
	<h2>{m.organization_types()}</h2>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
		consequatur amet blanditiis sed alias. Eum, numquam magnam!
	</p>
</DashboardSubHeader>
<DashboardSubSection>
	<form id={$formId} class="sr-only" use:enhance method="POST"></form>
	<ul class="px-card-padding gap-gap flex flex-row flex-wrap">
		<li>
			<OrganizationTypeCreate data={data.organizationTypeCreateForm} />
		</li>
		{#each data.organizationTypeForms as organizationTypeFormData, i (organizationTypeFormData.id)}
			<li>
				<OrganizationType {organizationTypeFormData} {organizationTypesForm} />
			</li>
		{/each}
	</ul>
</DashboardSubSection>
