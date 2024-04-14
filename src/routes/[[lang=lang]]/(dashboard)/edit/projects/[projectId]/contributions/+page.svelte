<script lang="ts">
	import * as m from '$i18n/messages';
	import { ripple } from '$lib/actions/ripple';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import LangKey from '$lib/components/LangKey.svelte';
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
			<LangKey>
				{m.project_contributors}
			</LangKey>
		</h2>
	</svelte:fragment>
	<DashboardFormSection>
		<h3>
			<LangKey>
				{m.orgs}
			</LangKey>
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
