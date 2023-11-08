<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormGroup from '$lib/components/DashboardFormField.svelte';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';

	const t = createTranslations({
		fr: {
			heading: 'Participants professionnels & contributeurs au projet',
			orgs: 'Organisations',
		},
		en: {
			heading: 'Professional participants and contributors to the project',
			orgs: 'Organizations',
		},
	});

	export let data;

	const {
		form,
		enhance,
		tainted,
		loadable: {
			submitter: { root: submitter },
		},
	} = superForm(data.form, { dataType: 'json' });
</script>

<DashboardForm action="?/update" {enhance}>
	<svelte:fragment slot="header">
		<h2 class="heading lg">{$t.heading}</h2>
	</svelte:fragment>
	<DashboardFormGroup>
		<h3>{$t.orgs}</h3>
		<div id="orgs">
			{#each data.allOrgs as org}
				<label class="token" use:ripple>
					<input
						class="token-input"
						type="checkbox"
						value={org.id}
						bind:group={$form.organizationIds}
					/>
					<span class="token-label">{org.name}</span>
				</label>
			{/each}
		</div>
	</DashboardFormGroup>
	<DashboardMenu {tainted} {submitter}></DashboardMenu>
</DashboardForm>

<style lang="postcss">
	#orgs {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
</style>
