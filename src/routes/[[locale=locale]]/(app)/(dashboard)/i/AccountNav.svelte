<script lang="ts">
	import { page } from '$app/stores';
	import Sidebar, { setDashboard } from '$lib/components/Sidebar.svelte';
	import SidebarItem from '$lib/components/SidebarItem.svelte';
	import { link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { ArrowRight, FolderHeart, Folders, Home, Settings, UserSquare2 } from 'lucide-svelte';

	setDashboard();

	const t = createTranslations({
		fr: {
			heading: 'Mon compte',
			home: 'Accueil',
			profile: 'Profil',
			collections: 'Collections',
			likes: 'Favoris',
			settings: 'Paramètres',
			editor: {
				heading: 'Gestion de fiches',
				projects: 'Projets',
				organizations: 'Organisations',
			},
		},
		en: {
			heading: 'Mon compte',
			home: 'Home',
			profile: 'Profile',
			collections: 'Collections',
			likes: 'Likes',
			settings: 'Settings',
			editor: {
				heading: 'Manage content',
				projects: 'Projects',
				organizations: 'Organizations',
			},
		},
	});
</script>

<Sidebar>
	<svelte:fragment slot="heading">
		{$t.heading}
	</svelte:fragment>
	<SidebarItem {...$link(`/i`)}>
		{$t.home}<Home class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/users/${$page.data?.user?.id}`)}>
		{$t.profile}<UserSquare2 class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/i/collections`)}>
		{$t.collections}<Folders class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/i/likes`)}>
		{$t.likes}<FolderHeart class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/i/settings`)}>
		{$t.settings}
		<Settings class="button-icon" />
	</SidebarItem>
</Sidebar>
<Sidebar>
	<svelte:fragment slot="heading">
		{$t.editor.heading}
	</svelte:fragment>
	<SidebarItem {...$link(`/edit/projects`)}>
		{$t.editor.projects}
		<ArrowRight class="button-icon" />
	</SidebarItem>
	<SidebarItem {...$link(`/edit/organizations`)}>
		{$t.editor.organizations}
		<ArrowRight class="button-icon" />
	</SidebarItem>
</Sidebar>

<style lang="postcss">
</style>
