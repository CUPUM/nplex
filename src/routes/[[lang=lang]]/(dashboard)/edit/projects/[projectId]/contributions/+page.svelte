<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { superForm } from '$lib/crud/validation/forms/super-form.js';

	export let data;

	const {
		form,
		enhance,
		tainted,
		elements: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, { dataType: 'json' });
</script>

<DashboardForm action="?/update" {enhance} {tainted} {submitter}>
	<svelte:fragment slot="header">
		<h2 class="heading lg">
			{m.project_contributors}
		</h2>
	</svelte:fragment>
	<DashboardFormSection>
		<h3>
			{m.orgs}
		</h3>
		<div id="orgs">
			{#each data.allOrgs as org}
				<label class="chip" use:ripple>
					<input
						class="visually-hidden"
						type="checkbox"
						value={org.id}
						bind:group={$form.organizationIds}
					/>
					<span class="chip-label">{org.name}</span>
				</label>
			{/each}
		</div>
	</DashboardFormSection>
</DashboardForm>

<style>
	#orgs {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
</style>
