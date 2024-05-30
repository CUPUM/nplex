<script lang="ts">
	import * as m from '$i18n/messages';
	import { USER_ROLES_ARR } from '$lib/auth/constants';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import SelectIcon from '$lib/components/SelectArrow.svelte';
	import SelectMenu from '$lib/components/SelectMenu.svelte';
	import SelectOption from '$lib/components/SelectOption.svelte';
	import { superForm } from '$lib/crud/validation/forms/super-form';
	import { createSelect, melt } from '@melt-ui/svelte';
	import { Crown, Send } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData['permissionsForm'];
	export let USER_ROLES: PageData['USER_ROLES'];

	const {
		form,
		enhance,
		states,
		tainted,
		elements: {
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

<DashboardForm {enhance} action="?/update" {tainted} {submitter}>
	<svelte:fragment slot="header">
		<h2>{m.user_role_and_permissions()}</h2>
	</svelte:fragment>
	<DashboardFormSection title={m.user_current_role()}>
		<fieldset class="input-group" disabled>
			<button class="input select" type="button" use:melt={$trigger}>
				<Crown class="input-icon" />
				{m.user_change_role()}
				<SelectIcon open={$open} />
			</button>
			<div class="input-peer">
				<button class="button" type="submit" formaction="?/requestRole" on:click|stopPropagation>
					<Send class="button-icon" />
					{m.user_request_role()}
				</button>
			</div>
		</fieldset>
		<SelectMenu {menu} {open}>
			{#each USER_ROLES_ARR as role}
				<SelectOption {option} value={role} label={role} {isSelected}>
					{role}
				</SelectOption>
			{/each}
		</SelectMenu>
	</DashboardFormSection>
	<DashboardFormSection title={m.user_shared_permissions()}>
		{m.coming_soon()}
		<!-- <section>
			<h3>{m.projects()}</h3>
		</section>
		<section>
			<h3>{m.orgs()}</h3>
		</section> -->
	</DashboardFormSection>
</DashboardForm>

<style>
	.input-group {
		align-self: center;
	}
</style>
