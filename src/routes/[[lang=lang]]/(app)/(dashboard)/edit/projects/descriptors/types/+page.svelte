<script lang="ts">
	import * as m from '$i18n/messages';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/forms/super-form';
	import DescriptorList from '../DescriptorList.svelte';
	import { descriptorFlip, descriptorIn, descriptorOut } from '../motion';
	import NewProjectType from './NewProjectType.svelte';
	import ProjectType from './ProjectType.svelte';

	export let data;

	const {
		enhance,
		elements: {
			submitter: { root: submitter },
		},
	} = superForm(data.deleteForm);
</script>

<form class="dashboard-section" use:enhance method="POST">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2><LangKey>{m.project_descriptors_types()}</LangKey></h2>
			<p class="dim">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus quidem doloribus nisi
				consequatur amet blanditiis sed alias. Eum, numquam magnam!
			</p>
		</hgroup>
	</header>
	<div class="dashboard-subsection">
		<DescriptorList>
			<li>
				<NewProjectType data={data.newForm} {submitter} />
			</li>
			{#each data.forms as form, i (form.id)}
				<li in:descriptorIn|global={{ i }} out:descriptorOut animate:descriptorFlip>
					<ProjectType data={form} {submitter} />
				</li>
			{/each}
		</DescriptorList>
	</div>
</form>
<slot />

<style lang="postcss">
	@import '$styles/scoped/dashboard';
</style>
