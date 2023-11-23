<script lang="ts">
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormMenu from '$lib/components/DashboardFormMenu.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';
	import { tt } from '$lib/i18n/translations';
	import type { Snapshot } from './$types.js';
	import ProjectCost from './ProjectCost.svelte';
	import ProjectInterventions from './ProjectInterventions.svelte';
	import ProjectOwnership from './ProjectOwnership.svelte';
	import ProjectTextDetails from './ProjectTextDetails.svelte';
	import ProjectType from './ProjectType.svelte';

	const t = createTranslations({
		fr: {
			heading: 'Information générale',
			save: tt.fr.editor.client.save,
		},
		en: {
			heading: 'General information',
			save: tt.en.editor.client.save,
		},
	});

	export let data;

	let smallScale = false;

	export const snapshot: Snapshot<boolean> = {
		capture() {
			return smallScale;
		},
		restore(snapshot) {
			smallScale = snapshot;
		},
	};

	const {
		form,
		enhance,
		tainted,
		constraints,
		states,
		loadable: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, {
		dataType: 'json',
		taintedMessage: null,
	});
</script>

<DashboardForm {enhance} action="?/update" method="POST">
	<svelte:fragment slot="header">
		<h2>{$t.heading}</h2>
		<p>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis accusantium, eius vero
			tenetur voluptatibus ducimus harum itaque praesentium qui cupiditate!
		</p>
	</svelte:fragment>
	<ProjectTextDetails {form} />
	<ProjectType {form} types={data.types} />
	<ProjectInterventions {form} categorizedInterventions={data.categorizedInterventions} />
	<ProjectOwnership {form} siteOwnerships={data.siteOwnerships} />
	<ProjectCost {form} bind:smallScale />
	<DashboardFormMenu {tainted} {submitter}></DashboardFormMenu>
</DashboardForm>

<style lang="postcss">
</style>
