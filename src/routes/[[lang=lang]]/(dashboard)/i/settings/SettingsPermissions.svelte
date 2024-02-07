<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardForm from '$lib/components/DashboardForm.svelte';
	import DashboardFormSection from '$lib/components/DashboardFormSection.svelte';
	import LangKey, { langKey } from '$lib/components/LangKey.svelte';
	import SelectIcon from '$lib/components/SelectArrow.svelte';
	import SelectMenu from '$lib/components/SelectMenu.svelte';
	import SelectOption from '$lib/components/SelectOption.svelte';
	import { superForm } from '$lib/forms/super-form';
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
		<h2><LangKey>{m.user_role_and_permissions()}</LangKey></h2>
	</svelte:fragment>
	<DashboardFormSection title={$langKey(m.user_current_role())}>
		<fieldset class="input-group" disabled>
			<button class="input select" type="button" use:melt={$trigger}>
				<Crown class="input-icon" />
				<LangKey>{m.user_change_role()}</LangKey>
				<SelectIcon open={$open} />
			</button>
			<div class="input-peer">
				<button class="button" type="submit" formaction="?/requestRole" on:click|stopPropagation>
					<Send class="button-icon" />
					<LangKey>{m.user_request_role()}</LangKey>
				</button>
			</div>
		</fieldset>
		<SelectMenu {menu} {open}>
			{#each USER_ROLES as role}
				<SelectOption {option} value={role.role} label={role.name} {isSelected}>
					{role.name}
				</SelectOption>
			{/each}
		</SelectMenu>
	</DashboardFormSection>
	<DashboardFormSection title={$langKey(m.user_shared_permissions())}>
		<coming_soon></coming_soon>
		<!-- <section>
			<h3><LangKey>{m.projects()}</LangKey></h3>
		</section>
		<section>
			<h3><LangKey>{m.orgs()}</LangKey></h3>
		</section> -->
	</DashboardFormSection>
</DashboardForm>

<style lang="postcss">
	.input-group {
		align-self: center;
	}
</style>
