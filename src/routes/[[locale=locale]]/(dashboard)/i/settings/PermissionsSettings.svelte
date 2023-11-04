<script lang="ts">
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import SelectMenu from '$lib/components/SelectMenu.svelte';
	import SelectOption from '$lib/components/SelectOption.svelte';
	import { superForm } from '$lib/forms/super-form';
	import { createTranslations } from '$lib/i18n/translate';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { Crown, Send } from 'lucide-svelte';
	import type { PageData } from './$types';

	const t = createTranslations({
		fr: {
			title: 'Rôle & permissions',
			changeRole: 'Changer de rôle',
			requestRole: 'Envoyer la requête',
		},
		en: {
			title: 'Role & permissions',
			changeRole: 'Change role',
			requestRole: 'Send request',
		},
	});

	export let data: PageData['permissionsForm'];
	export let roles: PageData['roles'];

	const {
		form,
		enhance,
		states,
		tainted,
		loadable: {
			submitter: { root: submitter },
		},
	} = superForm(data);

	const {
		elements: { trigger, menu, option },
		states: { selected, selectedLabel, open },
		helpers: { isSelected },
	} = createSelect({
		preventScroll: false,
		positioning: { sameWidth: true, placement: 'bottom' },
	});
</script>

<DashboardForm {enhance} action="?/update">
	<svelte:fragment slot="header">
		<h1 class="heading lg">{$t.title}</h1>
	</svelte:fragment>
	<DashboardFormSection>
		<fieldset class="input-group" use:melt={$trigger}>
			<Crown class="input-icon" />
			<button class="input" type="button">
				{$t.changeRole}
			</button>
			<div class="input-peer">
				<button class="button" type="submit" formaction="?/requestRole" on:click|stopPropagation>
					<Send class="button-icon" />{$t.requestRole}
				</button>
			</div>
		</fieldset>
		<SelectMenu {menu} {open}>
			{#each roles as role}
				<SelectOption {option} value={role.role} label={role.name} {isSelected}>
					{role.name}
				</SelectOption>
			{/each}
		</SelectMenu>
		<h2>Current permissions</h2>
		<section>
			<h3>Projects</h3>
		</section>
		<section>
			<h3>Organizations</h3>
		</section>
	</DashboardFormSection>
</DashboardForm>

<style lang="postcss">
</style>
