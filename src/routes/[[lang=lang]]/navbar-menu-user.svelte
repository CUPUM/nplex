<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import * as m from '$i18n/messages';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import NavbarMenuGroup from '$lib/components/patterns/navbar-menu-group.svelte';
	import NavbarMenuItem from '$lib/components/patterns/navbar-menu-item.svelte';
	import NavbarMenu from '$lib/components/patterns/navbar-menu.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { authorize } from '$lib/crud/authorization/rbac.svelte';
	import {
		Building2,
		DraftingCompass,
		FilePlus,
		LogOut,
		Pencil,
		Tags,
		User,
		UserCog,
	} from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let { trigger }: { trigger: Snippet<[Dialog['triggerAttributes']]> } = $props();

	const dialog = new Dialog();

	let loggingOut = $state(false);
</script>

{@render trigger(dialog.triggerAttributes)}
<NavbarMenu {dialog}>
	<NavbarMenuGroup {...dialog.contentAttributes} intro={{ delay: 0 }}>
		{#snippet legend()}
			{m.projects()} <DraftingCompass />
		{/snippet}
		<NavbarMenuItem {...linkAttributes('/edit/projects')} {...dialog.itemAttributes}>
			<Pencil />
			{m.nav_edit_projects()}
		</NavbarMenuItem>
		<NavbarMenuItem
			{...linkAttributes('/create/project')}
			rel="external"
			{...dialog.itemAttributes}
		>
			<FilePlus />
			{m.nav_new_project()}
		</NavbarMenuItem>
		{#if authorize('projects.descriptors.update')}
			<NavbarMenuItem {...linkAttributes('/edit/projects/descriptors')} {...dialog.itemAttributes}>
				<Tags />
				{m.nav_edit_project_descriptors()}
			</NavbarMenuItem>
		{/if}
	</NavbarMenuGroup>
	<NavbarMenuGroup {...dialog.contentAttributes} intro={{ delay: 150 }}>
		{#snippet legend()}
			{m.organizations()} <Building2 />
		{/snippet}
		<NavbarMenuItem {...linkAttributes('/edit/organizations')} {...dialog.itemAttributes}>
			<Pencil />
			{m.nav_edit_orgs()}
		</NavbarMenuItem>
		<NavbarMenuItem
			{...linkAttributes('/create/organization')}
			rel="external"
			{...dialog.itemAttributes}
		>
			<FilePlus />
			{m.nav_new_org()}
		</NavbarMenuItem>
		<NavbarMenuItem
			{...linkAttributes('/edit/organizations/descriptors')}
			{...dialog.itemAttributes}
		>
			<Tags />
			{m.nav_edit_orgs_descriptors()}
		</NavbarMenuItem>
	</NavbarMenuGroup>
	<NavbarMenuGroup {...dialog.contentAttributes} intro={{ delay: 300 }}>
		{#snippet legend()}
			{m.account()} <User />
		{/snippet}
		<NavbarMenuItem {...linkAttributes('/i')} {...dialog.itemAttributes}>
			<UserCog />
			{m.my_account()}
		</NavbarMenuItem>
		<form
			method="POST"
			id="logout-form"
			class="sr-only"
			action="/?/logout"
			use:enhance={({ formElement, formData, action, cancel }) => {
				loggingOut = true;
				return async ({ result }) => {
					await applyAction(result);
					loggingOut = false;
				};
			}}
		></form>
		<NavbarMenuItem
			type="submit"
			form="logout-form"
			disabled={loggingOut}
			data-loading={loggingOut}
		>
			<LogOut />
			{m.logout()}
		</NavbarMenuItem>
	</NavbarMenuGroup>
</NavbarMenu>
