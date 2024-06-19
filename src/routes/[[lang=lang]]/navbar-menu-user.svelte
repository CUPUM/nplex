<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import * as m from '$i18n/messages';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { authorize } from '$lib/crud/authorization/rbac.svelte';
	import { FilePlus, LogOut, Pencil, Tags, UserRound } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { cubicIn, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let { trigger }: { trigger: Snippet<[Dialog['triggerAttributes']]> } = $props();

	const menu = new Dialog();

	let loggingOut = $state(false);
</script>

{@render trigger(menu.triggerAttributes)}
{#if menu.open}
	<dialog class="navbar-menu" use:menu.dialogAction {...menu.dialogAttributes} data-meta-modal>
		<menu
			class="navbar-menu-group w-[34ch]"
			in:fly|global={{ x: 20, duration: 1000, easing: expoOut }}
			out:fly={{ x: 50, duration: 200, easing: cubicIn, delay: 150 }}
		>
			<span class="navbar-menu-group-legend">
				{m.projects()}
			</span>
			<ul class="navbar-menu-group-items">
				<a class="button button-nav" {...linkAttributes('/edit/projects')} {...menu.itemAttributes}>
					<Pencil class="button-icon" />
					{m.nav_edit_projects()}
				</a>
				<a class="button button-nav" {...linkAttributes('/new/project')} {...menu.itemAttributes}>
					<FilePlus class="button-icon" />
					{m.nav_new_project()}
				</a>
				{#if authorize('projects.descriptors.update')}
					<a
						class="button button-nav"
						{...linkAttributes('/edit/projects/descriptors')}
						{...menu.itemAttributes}
					>
						<Tags class="button-icon" />
						{m.nav_edit_project_descriptors()}
					</a>
				{/if}
			</ul>
		</menu>
		<menu
			class="navbar-menu-group w-[34ch]"
			in:fly|global={{ x: 20, duration: 1000, easing: expoOut, delay: 75 }}
			out:fly={{ x: 50, duration: 200, easing: cubicIn, delay: 75 }}
		>
			<span class="navbar-menu-group-legend">
				{m.organizations()}
			</span>
			<ul class="navbar-menu-group-items">
				<a
					class="button button-nav"
					{...linkAttributes('/edit/organizations')}
					{...menu.itemAttributes}
				>
					<Pencil class="button-icon" />
					{m.nav_edit_orgs()}
				</a>
				<a
					class="button button-nav"
					{...linkAttributes('/new/organization')}
					{...menu.itemAttributes}
				>
					<FilePlus class="button-icon" />
					{m.nav_new_org()}
				</a>
				<a
					class="button button-nav"
					{...linkAttributes('/edit/organizations/descriptors')}
					{...menu.itemAttributes}
				>
					<Tags class="button-icon" />
					{m.nav_edit_orgs_descriptors()}
				</a>
			</ul>
		</menu>
		<menu
			class="navbar-menu-group"
			in:fly|global={{ x: 20, duration: 1000, easing: expoOut, delay: 150 }}
			out:fly={{ x: 50, duration: 200, easing: cubicIn, delay: 0 }}
		>
			<ul class="navbar-menu-group-items">
				<a class="button button-nav" {...linkAttributes('/i')} {...menu.itemAttributes}>
					<UserRound class="button-icon" />
					{m.account()}
				</a>
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
				<button
					class="button button-nav"
					type="submit"
					form="logout-form"
					disabled={loggingOut}
					data-loading={loggingOut}
				>
					<LogOut />
					{m.logout()}
				</button>
			</ul>
		</menu>
	</dialog>
{/if}
