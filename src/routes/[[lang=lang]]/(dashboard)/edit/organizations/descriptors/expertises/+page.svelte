<script lang="ts">
	import * as m from '$i18n/messages';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import OrganizationExpertiseCreate from './organization-expertise-create.svelte';
	import OrganizationExpertise from './organization-expertise.svelte';

	let { data } = $props();

	const organizationExpertisesListForm = extendedSuperForm(data.organizationExpertisesListForm, {
		invalidateAll: true,
	});

	const { formId, enhance } = organizationExpertisesListForm;
</script>

<section class="dashboard-section">
	<h2 class="dashboard-section-title">{m.organization_expertises()}</h2>
	<div class="dashboard-section-description">
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
			consequatur amet blanditiis sed alias. Eum, numquam magnam!
		</p>
	</div>
	<form id={$formId} class="sr-only" use:enhance method="POST"></form>
	<ul class="px-card-padding gap-gutter flex flex-row flex-wrap">
		<li>
			<OrganizationExpertiseCreate data={data.organizationExpertiseCreateForm} />
		</li>
		{#each data.organizationExpertiseForms as organizationExpertiseFormData, i (organizationExpertiseFormData.id)}
			<li>
				<OrganizationExpertise {organizationExpertiseFormData} {organizationExpertisesListForm} />
			</li>
		{/each}
	</ul>
</section>
