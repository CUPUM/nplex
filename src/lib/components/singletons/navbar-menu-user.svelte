<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import { FilePlus2, LogOut, Pencil, Sliders, UserRound } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { cubicIn, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { linkAttributes } from '../primitives/link.svelte';

	let { trigger }: { trigger: Snippet<[Dialog['triggerAttributes']]> } = $props();

	const menu = new Dialog();

	let loggingOut = $state(false);
</script>

{@render trigger(menu.triggerAttributes)}
{#if menu.open}
	<dialog class="navbar-menu" use:menu.dialogAction {...menu.dialogAttributes} data-meta-modal>
		<menu
			class="navbar-menu-group"
			in:fly|global={{ x: 20, duration: 1000, easing: expoOut }}
			out:fly={{ x: 50, duration: 200, easing: cubicIn, delay: 75 }}
		>
			<span class="navbar-menu-group-legend">
				{m.projects()}
			</span>
			<ul class="navbar-menu-group-items">
				<a
					class="button button-ghost"
					{...linkAttributes('/edit/projects')}
					{...menu.itemAttributes}
				>
					{m.nav_edit_projects()}
					<Pencil class="button-icon" />
				</a>
				<a class="button button-ghost" {...linkAttributes('/new/project')} {...menu.itemAttributes}>
					{m.nav_new_project()}
					<FilePlus2 class="button-icon" />
				</a>
				<a
					class="button button-ghost"
					{...linkAttributes('/edit/projects/descriptors')}
					{...menu.itemAttributes}
				>
					{m.nav_edit_project_descriptors()}
					<Sliders class="button-icon" />
				</a>
			</ul>
		</menu>
		<menu
			class="navbar-menu-group"
			in:fly|global={{ x: 20, duration: 1000, easing: expoOut }}
			out:fly={{ x: 50, duration: 200, easing: cubicIn, delay: 75 }}
		>
			<span class="navbar-menu-group-legend">
				{m.organizations()}
			</span>
			<ul class="navbar-menu-group-items">
				<a
					class="button button-ghost"
					{...linkAttributes('/edit/organizations')}
					{...menu.itemAttributes}
				>
					{m.nav_edit_orgs()}
					<Pencil class="button-icon" />
				</a>
				<a
					class="button button-ghost"
					{...linkAttributes('/new/organization')}
					{...menu.itemAttributes}
				>
					{m.nav_new_org()}
					<FilePlus2 class="button-icon" />
				</a>
				<a
					class="button button-ghost"
					{...linkAttributes('/edit/organizations/descriptors')}
					{...menu.itemAttributes}
				>
					{m.nav_edit_orgs_descriptors()}
					<Sliders class="button-icon" />
				</a>
			</ul>
		</menu>
		<menu
			class="navbar-menu-group"
			in:fly|global={{ x: 20, duration: 1000, easing: expoOut }}
			out:fly={{ x: 50, duration: 200, easing: cubicIn, delay: 75 }}
		>
			<ul class="navbar-menu-group-items">
				<div>
					{m.user_role()}:
					{#await $page.data.roleName}
						'...'
					{:then roleName}
						{roleName}
					{/await}
				</div>
				<a class="navbar-menu-button" {...linkAttributes('/i')} {...menu.itemAttributes}>
					{m.account()}
					<UserRound class="button-icon" />
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
					class="navbar-menu-button"
					type="submit"
					form="logout-form"
					disabled={loggingOut}
					data-loading={loggingOut}
				>
					{m.logout()}
					<LogOut />
				</button>
			</ul>
		</menu>
	</dialog>
{/if}
