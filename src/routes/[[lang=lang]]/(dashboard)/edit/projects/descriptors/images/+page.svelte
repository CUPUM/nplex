<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/crud/validation/forms/super-form';
	import DescriptorList from '../../../DescriptorList.svelte';
	import { descriptorFlip, descriptorIn, descriptorOut } from '../../../motion';
	import ImageType from './ImageType.svelte';
	import NewImageType from './NewImageType.svelte';

	export let data;

	const {
		enhance,
		elements: {
			submitter: { root: listSubmitter },
		},
	} = superForm(data.imageTypesForm);
</script>

<form class="dashboard-section" use:enhance method="POST">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2><LangKey>{m.project_image_types()}</LangKey></h2>
			<p class="dim">
				Amet, beatae porro, nam deleniti sit minus minima quae ratione error consequatur labore
				blanditiis ab sapiente fugiat, ipsa non dolor veritatis voluptatem ipsam facilis assumenda
				unde. Minima possimus necessitatibus dolorem ipsa reiciendis quod nesciunt asperiores rem.
				Dolor rerum natus impedit maiores numquam!
			</p>
		</hgroup>
	</header>
	<div class="dashboard-subsection">
		<DescriptorList>
			<li>
				<NewImageType data={data.newImageTypeForm} />
			</li>
			{#each data.imageTypeForms as form, i (form.id)}
				<li in:descriptorIn|global={{ i }} out:descriptorOut animate:descriptorFlip>
					<ImageType data={form} {listSubmitter} />
				</li>
			{/each}
		</DescriptorList>
	</div>
</form>

<style>
	@import '$styles/scoped/dashboard';
</style>
