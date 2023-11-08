<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormGroup from '$lib/components/DashboardFormField.svelte';
	import DashboardMenu from '$lib/components/DashboardMenu.svelte';
	import { createTranslations } from '$lib/i18n/translate';
	import { Save } from 'lucide-svelte';
	import { expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { superForm } from 'sveltekit-superforms/client';
	import { dt } from '../../../translations';

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

	const { form, enhance, tainted } = superForm(data.form, { dataType: 'json' });
</script>

<DashboardForm action="?/update" {enhance} let:element let:loading>
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
	<DashboardMenu>
		{#if $tainted}
			<button
				class="button cta"
				type="submit"
				{...element()}
				use:loading
				transition:scale={{ start: 0.95, opacity: 0, easing: expoOut, duration: 150 }}
			>
				<Save class="button-icon" />{$dt.save}
			</button>
		{/if}
	</DashboardMenu>
</DashboardForm>

<style lang="postcss">
	#orgs {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
</style>
