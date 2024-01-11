<script
	lang="ts"
	generics="C extends PageData['categoryForms'][number], I extends PageData['interventionForms'], NI extends PageData['newInterventionForm']"
>
	import type { SuperForm } from '$lib/forms/super-form';
	import DescriptorList from '../../../DescriptorList.svelte';
	import MetaDescriptor from '../../../MetaDescriptor.svelte';
	import { descriptorFlip, descriptorIn, descriptorOut } from '../../../motion';
	import type { PageData } from './$types';
	import Intervention from './Intervention.svelte';

	// export let i: number;
	export let category: C;
	export let interventionForms: I;
	export let newInterventionForm: NI;
	export let listSubmitter: SuperForm['elements']['submitter']['root'];
</script>

<MetaDescriptor>
	<svetle:fragment slot="title">Test</svetle:fragment>
	<svelte:fragment slot="description">
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo nobis quod aut, reprehenderit
		alias perspiciatis! Nesciunt, pariatur. Exercitationem, aperiam laboriosam.
	</svelte:fragment>
	<DescriptorList>
		<!-- <li>
			<NewIntervention data={newInterventionForm} />
		</li> -->
		{#each interventionForms as interventionForm, i (interventionForm.id)}
			<li in:descriptorIn|global={{ i }} out:descriptorOut animate:descriptorFlip>
				<Intervention data={interventionForm} {listSubmitter} />
			</li>
		{/each}
	</DescriptorList>
</MetaDescriptor>

<style lang="postcss">
</style>
