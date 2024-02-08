<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { createLoadable } from '$lib/builders/loading';
	import LangKey from '$lib/components/LangKey.svelte';
	import { link } from '$lib/i18n/link';
	import { melt, type DialogElements } from '@melt-ui/svelte';
	import { FilePlus2, LogOut, Pencil, Sliders, User2 } from 'lucide-svelte';
	import type { StoresValues } from 'svelte/store';

	export let close: StoresValues<DialogElements['close']>;
	export let description: StoresValues<DialogElements['description']>;
	export let title: StoresValues<DialogElements['title']>;

	const {
		elements: { root: loggingout },
		state,
	} = createLoadable();
</script>

<div id="navbar-menu-user-grid">
	<section class="navbar-menu-group">
		<legend class="navbar-menu-group-label">
			<LangKey>{m.projects()}</LangKey>
		</legend>
		<a class="navbar-menu-button" {...$link('/edit/projects')}>
			<LangKey>{m.nav_edit_projects()}</LangKey>
			<Pencil class="button-icon" />
		</a>
		<a class="navbar-menu-button" {...$link('/new/project')}>
			<LangKey>{m.nav_new_project()}</LangKey>
			<FilePlus2 class="button-icon" />
		</a>
		<a class="navbar-menu-button" {...$link('/edit/projects/descriptors')}>
			<LangKey>{m.nav_edit_project_descriptors()}</LangKey>
			<Sliders class="button-icon" />
		</a>
	</section>
	<section class="navbar-menu-group">
		<legend class="navbar-menu-group-label">
			<LangKey>{m.organizations()}</LangKey>
		</legend>
		<a class="navbar-menu-button" {...$link('/edit/organizations')}>
			<LangKey>{m.nav_edit_orgs()}</LangKey>
			<Pencil class="button-icon" />
		</a>
		<a class="navbar-menu-button" {...$link('/new/organization')}>
			<LangKey>{m.nav_new_org()}</LangKey>
			<FilePlus2 class="button-icon" />
		</a>
		<a class="navbar-menu-button" {...$link('/edit/organizations/descriptors')}>
			<LangKey>{m.nav_edit_orgs_descriptors()}</LangKey>
			<Sliders class="button-icon" />
		</a>
	</section>
	<section class="navbar-menu-group" id="account-group">
		<div>
			<LangKey>{m.user_role()}</LangKey>:
			{#await $page.data.roleName}
				'...'
			{:then roleName}
				{roleName}
			{/await}
		</div>
		<a class="navbar-menu-button" {...$link('/i')}>
			<LangKey>{m.account()}</LangKey>
			<User2 class="button-icon" />
		</a>
		<form
			method="POST"
			id="logout-form"
			hidden
			use:enhance={({ formElement, formData, action, cancel }) => {
				state.set(true);
				return async ({ result }) => {
					await applyAction(result);
					state.set(false);
				};
			}}
		/>
		<button class="navbar-menu-button" type="submit" form="logout-form" use:melt={$loggingout}>
			<LangKey>{m.logout()}</LangKey>
			<LogOut />
		</button>
	</section>
</div>

<style lang="postcss">
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
