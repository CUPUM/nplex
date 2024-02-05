<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/forms/super-form';
	import DescriptorList from '../../../DescriptorList.svelte';
	import { descriptorFlip, descriptorIn, descriptorOut } from '../../../motion';
	import Implantation from './Implantation.svelte';
	import NewImplantation from './NewImplantation.svelte';

	export let data;

	const {
		enhance,
		elements: {
			submitter: { root: listSubmitter },
		},
	} = superForm(data.implantationTypesForm);
</script>

<form class="dashboard-section" use:enhance method="POST">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2><LangKey>{m.project_implantation_modes()}</LangKey></h2>
			<p class="dim">
				Dolores voluptates earum suscipit cum voluptas dolorum aut consequatur qui beatae
				consequuntur nulla quisquam ducimus molestiae laboriosam animi possimus, corrupti cupiditate
				autem ullam ex culpa non assumenda quia voluptatibus? Omnis, excepturi quo.
			</p>
		</hgroup>
	</header>
	<div class="dashboard-subsection">
		<DescriptorList>
			<li>
				<NewImplantation data={data.newImplantationTypeForm} />
			</li>
			{#each data.implantationTypeForms as form, i (form.id)}
				<li in:descriptorIn|global={{ i }} out:descriptorOut animate:descriptorFlip>
					<Implantation data={form} {listSubmitter} />
				</li>
			{/each}
		</DescriptorList>
	</div>
</form>

<style lang="postcss">
	@import '$styles/scoped/dashboard';
</style>
