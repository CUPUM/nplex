<!-- <script lang="ts">
	import * as m from '$i18n/messages';
	import { superForm } from '$lib/crud/validation/forms/super-form';
	import DescriptorList from '../../../DescriptorList.svelte';
	import { descriptorFlip, descriptorIn, descriptorOut } from '../../../motion';
	import Level from './Level.svelte';
	import NewLevel from './NewLevel.svelte';

	export let data;

	const {
		enhance,
		elements: {
			submitter: { root: listSubmitter },
		},
	} = superForm(data.levelTypesForm);
</script>

<form class="dashboard-section" use:enhance method="POST">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2>{m.project_level_types()}</h2>
			<p class="dim">
				Quas blanditiis sit sed asperiores, sapiente neque atque harum vel fugit. Hic.
			</p>
		</hgroup>
	</header>
	<div class="dashboard-subsection">
		<DescriptorList>
			<li>
				<NewLevel data={data.newLevelTypeForm} />
			</li>
			{#each data.levelTypeForms as form, i (form.id)}
				<li in:descriptorIn|global={{ i }} out:descriptorOut animate:descriptorFlip>
					<Level data={form} {listSubmitter} />
				</li>
			{/each}
		</DescriptorList>
	</div>
</form>

<style>
	@import '$styles/scoped/dashboard';
</style> -->
