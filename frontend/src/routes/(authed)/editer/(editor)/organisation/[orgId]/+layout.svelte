<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button/Button.svelte';
	import Icon from '$components/Icon.svelte';
	import Sidebar from '$components/Sidebar/Sidebar.svelte';
	import SidebarButton from '$components/Sidebar/SidebarButton.svelte';
	import { writable } from 'svelte/store';
	import { EDITOR_FORM_ACTION, EDITOR_FORM_ID } from '../../common';
	import EditorBreadcrumbs from '../../EditorBreadcrumbs.svelte';
	import EditorHeader from '../../EditorHeader.svelte';
	import EditorNavigationModal from '../../EditorNavigationModal.svelte';
	import EditorToolbar from '../../EditorToolbar.svelte';

	export let data;

	const submitting = writable(false); // pass readonly(submitting) as context? Idem for data to avoid bugs with $page.data on nav?

	function base(subpath: string, formHash: boolean = true) {
		return `/editer/organisation/${data.organization.id}${subpath}${
			formHash ? '#' + EDITOR_FORM_ID : ''
		}`;
	}

	const orgEditorRoutes = [
		{
			pathname: base('', false),
			title: 'Général',
		},
		{
			pathname: base('/membres'),
			title: 'Membres',
		},
		{
			pathname: base('/parametres'),
			title: 'Paramètres',
		},
	] satisfies { pathname: string; title: string }[];
</script>

<EditorBreadcrumbs crumbs={data.crumbs} />
<EditorHeader>
	<svelte:fragment slot="heading">{data.organization.name}</svelte:fragment>
	<svelte:fragment slot="nav">
		<Button variant="cta" href="/projets/{data.organization.id}">
			Consulter la fiche <Icon name="file" slot="trailing" />
		</Button>
	</svelte:fragment>
</EditorHeader>
<article>
	<Sidebar variant="outlined">
		{#each orgEditorRoutes as route, i}
			<SidebarButton {i} href={route.pathname}>{route.title}</SidebarButton>
		{/each}
	</Sidebar>
	<form
		use:enhance={({ form, data, action, cancel }) => {
			submitting.set(true);
			return async ({ update, result }) => {
				update({ reset: false });
				if (result.type !== 'success' && result.type !== 'redirect') {
					submitting.set(false);
				}
			};
		}}
		method="POST"
		action="?/{EDITOR_FORM_ACTION}"
		id={EDITOR_FORM_ID}
	>
		<slot />
	</form>
</article>
<EditorToolbar />
<EditorNavigationModal />

<style lang="scss">
	article {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: var(--ui-gap-sm);
	}

	form {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--ui-gap-sm);
		min-height: 100vh;
		min-height: 100svh;
		scroll-margin-block-start: var(--ui-nav-h);
	}
</style>
