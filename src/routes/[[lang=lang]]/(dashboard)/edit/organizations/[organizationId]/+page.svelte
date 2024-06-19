<script lang="ts">
	import * as m from '$i18n/messages';
	import IconSpinner from '$lib/components/patterns/icon-spinner.svelte';
	import { extendedSuperForm } from '$lib/crud/form/client';
	import { Check } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import OrganizationTextDetails from './organization-text-details.svelte';
	import OrganizationType from './organization-type.svelte';

	let { data } = $props();

	const organizationForm = extendedSuperForm(data.form, {
		dataType: 'json',
		invalidateAll: 'force',
	});

	const { submitter, enhance, isTainted, tainted } = organizationForm;

	let submitRef = $state<HTMLButtonElement>();
</script>

<form use:enhance action="?/update" method="POST" class="gap-inherit flex flex-col">
	<header class="dashboard-header">
		<h2 class="dashboard-section-title">
			{m.project_general()}
		</h2>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum incidunt rem temporibus,
			eaque a atque iste fuga ea minima omnis rerum provident ullam laboriosam perferendis optio,
			blanditiis, quo possimus doloribus sed laudantium repudiandae vitae? Illum aut vel ipsa vero
			facilis possimus consequuntur error ea? Accusamus ab exercitationem obcaecati facere eius?
		</p>
	</header>
	<OrganizationTextDetails {...organizationForm} />
	<OrganizationType {...organizationForm} types={data.types} />
	<menu class="dashboard-section-menu" in:fly|global={{ y: 6, duration: 250, easing: expoOut }}>
		<button class="button button-cta" bind:this={submitRef} disabled={!isTainted($tainted)}>
			{m.save()}<IconSpinner icon={Check} busy={submitRef === $submitter} />
		</button>
	</menu>
</form>
