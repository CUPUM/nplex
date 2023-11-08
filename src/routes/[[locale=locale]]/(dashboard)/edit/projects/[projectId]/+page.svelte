<script lang="ts">
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';
	import { tt } from '$lib/i18n/translations';
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

	let submitRef: HTMLButtonElement;

	const {
		form,
		enhance,
		tainted,
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
		<h1 class="heading lg">{$t.heading}</h1>
		<p class="prose dim subhead">
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis accusantium, eius vero
			tenetur voluptatibus ducimus harum itaque praesentium qui cupiditate!
		</p>
	</svelte:fragment>
	<ProjectTextDetails {form} />
	<ProjectType {form} types={data.types} />
	<ProjectInterventions {form} categorizedInterventions={data.categorizedInterventions} />
	<ProjectOwnership {form} siteOwnerships={data.siteOwnerships} />
	<ProjectCost {form} />
	<DashboardMenu {tainted} {submitter}></DashboardMenu>
</DashboardForm>

<style lang="postcss">
</style>
