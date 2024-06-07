<!-- <script lang="ts">
	import * as m from '$i18n/messages';
	import { superForm } from '$lib/crud/validation/forms/super-form';
	import DescriptorList from '../../../DescriptorList.svelte';
	import { descriptorFlip, descriptorIn, descriptorOut } from '../../../motion';
	import NewSiteOwnership from './NewSiteOwnership.svelte';
	import SiteOwnership from './SiteOwnership.svelte';

	export let data;

	const {
		enhance,
		elements: {
			submitter: { root: listSubmitter },
		},
	} = superForm(data.siteOwnershipsForm);
</script>

<form class="dashboard-section" use:enhance method="POST">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2>{m.project_site_ownerships()}</h2>
			<p class="dim">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
				consequatur amet blanditiis sed alias. Eum, numquam magnam!
			</p>
		</hgroup>
	</header>
	<div class="dashboard-subsection">
		<DescriptorList>
			<li>
				<NewSiteOwnership data={data.newSiteOwnershipForm} />
			</li>
			{#each data.siteOwnershipForms as form, i (form.id)}
				<li in:descriptorIn|global={{ i }} out:descriptorOut animate:descriptorFlip>
					<SiteOwnership data={form} {listSubmitter} />
				</li>
			{/each}
		</DescriptorList>
	</div>
</form>

<style>
	@import '$styles/scoped/dashboard';
</style> -->
