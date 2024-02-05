<script lang="ts">
	import * as m from '$i18n/messages';
	import ButtonSaveAll from '$lib/components/ButtonSaveAll.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
	import { superForm } from '$lib/forms/super-form';
	import type { Snapshot } from './$types.js';
	import ProjectCost from './ProjectCost.svelte';
	import ProjectInterventions from './ProjectInterventions.svelte';
	import ProjectOwnership from './ProjectOwnership.svelte';
	import ProjectTextDetails from './ProjectTextDetails.svelte';
	import ProjectType from './ProjectType.svelte';

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
		elements: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, {
		dataType: 'json',
		taintedMessage: null,
		resetForm: false,
	});

	let submitRef: HTMLButtonElement;
</script>

<form use:enhance action="?/update" method="POST" class="dashboard-section">
	<header class="dashboard-section-header">
		<hgroup class="prose">
			<h2>
				<LangKey>{m.project_general()}</LangKey>
			</h2>
			<p class="dim">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis accusantium, eius vero
				tenetur voluptatibus ducimus harum itaque praesentium qui cupiditate!
			</p>
		</hgroup>
	</header>
	<ProjectTextDetails {form} />
	<ProjectType {form} types={data.types} />
	<ProjectInterventions {form} categorizedInterventions={data.categorizedInterventions} />
	<ProjectOwnership {form} siteOwnerships={data.siteOwnerships} />
	<ProjectCost {form} bind:smallScale />
	<menu class="dashboard-section-menu">
		{#if $tainted}
			<ButtonSaveAll {submitter} />
		{/if}
	</menu>
</form>

<style lang="postcss">
	@import '$styles/scoped/dashboard';
</style>
