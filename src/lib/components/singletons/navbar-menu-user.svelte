<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { FilePlus2, LogOut, Pencil, Sliders, User2 } from 'lucide-svelte';
	import { linkAttributes } from '../primitives/link.svelte';

	let loggingOut = $state(false);
</script>

<div id="navbar-menu-user-grid">
	<section class="navbar-menu-group">
		<legend class="navbar-menu-group-label">
			{m.projects()}
		</legend>
		<a class="navbar-menu-button" {...linkAttributes('/edit/projects')}>
			{m.nav_edit_projects()}
			<Pencil class="button-icon" />
		</a>
		<a class="navbar-menu-button" {...linkAttributes('/new/project')}>
			{m.nav_new_project()}
			<FilePlus2 class="button-icon" />
		</a>
		<a class="navbar-menu-button" {...linkAttributes('/edit/projects/descriptors')}>
			{m.nav_edit_project_descriptors()}
			<Sliders class="button-icon" />
		</a>
	</section>
	<section class="navbar-menu-group">
		<legend class="navbar-menu-group-label">
			{m.organizations()}
		</legend>
		<a class="navbar-menu-button" {...linkAttributes('/edit/organizations')}>
			{m.nav_edit_orgs()}
			<Pencil class="button-icon" />
		</a>
		<a class="navbar-menu-button" {...linkAttributes('/new/organization')}>
			{m.nav_new_org()}
			<FilePlus2 class="button-icon" />
		</a>
		<a class="navbar-menu-button" {...linkAttributes('/edit/organizations/descriptors')}>
			{m.nav_edit_orgs_descriptors()}
			<Sliders class="button-icon" />
		</a>
	</section>
	<section class="navbar-menu-group" id="account-group">
		<div>
			{m.user_role()}:
			{#await $page.data.roleName}
				'...'
			{:then roleName}
				{roleName}
			{/await}
		</div>
		<a class="navbar-menu-button" {...linkAttributes('/i')}>
			{m.account()}
			<User2 class="button-icon" />
		</a>
		<form
			method="POST"
			id="logout-form"
			hidden
			use:enhance={({ formElement, formData, action, cancel }) => {
				loggingOut = true;
				return async ({ result }) => {
					await applyAction(result);
					loggingOut = false;
				};
			}}
		/>
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
	</section>
</div>

<style>
	#navbar-menu-user-grid {
		padding: var(--inlay);
		gap: var(--inlay);
		display: grid;
		/* grid-template-rows: ; */
	}

	.navbar-menu-group {
		pointer-events: all;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		border-radius: var(--radius-lg);
		background: var(--floating-bg);

		&:nth-last-child(2) {
			flex-grow: 1;
		}
	}

	#account-group {
		position: sticky;
		bottom: 0;
		background: red;
	}

	.navbar-menu-group-label {
		font-weight: var(--weight-bold);
	}

	.navbar-menu-button {
		display: flex;
		flex-direction: row;
		padding-inline: var(--padding-inline);
		padding-block: var(--padding-block);
		border-radius: var(--radius-md);

		:global(:--icon) {
			width: 1em;
		}
	}
</style>
