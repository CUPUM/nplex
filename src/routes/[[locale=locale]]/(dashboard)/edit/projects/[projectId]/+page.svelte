<script lang="ts">
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';
	import { melt } from '@melt-ui/svelte';
	import { Save } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import ProjectCost from './ProjectCost.svelte';
	import ProjectOwnership from './ProjectOwnership.svelte';
	import ProjectTextDetails from './ProjectTextDetails.svelte';
	import ProjectType from './ProjectType.svelte';
	import { pt } from './translations';

	const t = createTranslations({
		fr: {
			heading: 'Information générale',
		},
		en: {
			heading: 'General information',
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
	<ProjectType {form} types={data.descriptors.types} />
	<ProjectOwnership {form} siteOwnerships={data.descriptors.siteOwnerships} />
	<!-- <ProjectInterventions {form} /> -->
	<ProjectCost {form} />
	<DashboardMenu>
		{#if $tainted}
			<button
				class="button cta"
				type="submit"
				bind:this={submitRef}
				use:melt={$submitter(submitRef)}
				transition:scale={{ start: 0.95, opacity: 0, easing: expoOut, duration: 150 }}
			>
				<Save class="button-icon" />{$pt.save}
			</button>
		{/if}
	</DashboardMenu>
</DashboardForm>

<style lang="postcss">
	.title {
		font-size: var(--size-lg);
	}

	.subhead {
		max-width: 65ch;
	}

	#interventions {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		font-size: var(--size-sm);
		flex-wrap: wrap;
	}

	#cost {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
