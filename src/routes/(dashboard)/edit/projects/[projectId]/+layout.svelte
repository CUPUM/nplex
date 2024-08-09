<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import DashboardSidebarMenuItem from '$lib/components/patterns/dashboard-sidebar-menu-item.svelte';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import OptionalText from '$lib/components/primitives/optional-text.svelte';
	import {
		Calendar,
		Cuboid,
		FileText,
		Images,
		MapPin,
		MonitorPlay,
		Tags,
		TriangleAlert,
		Undo2,
		Users,
	} from 'lucide-svelte';
	import DashboardSidebarMenuOrganizations from '../../../dashboard-sidebar-menu-organizations.svelte';
	import DashboardSidebarMenuProjects from '../../../dashboard-sidebar-menu-projects.svelte';

	let { children, data } = $props();

	const { setHeader, setSidebar } = getDashboardContext(true);

	setHeader(header);
	setSidebar(sidebar);
</script>

{#snippet header()}
	<div
		class="rounded-section p-section-padding bg-dotted from-input to-card/soft flex flex-1 flex-col bg-center"
	>
		<hgroup class="pb-xl flex-1">
			<h1 class="heading text-5xl font-bold">
				<OptionalText text={data.title} fallback={m.project_untitled()} />
			</h1>
		</hgroup>
		<menu class="gap-input-group-gap flex flex-row justify-between text-xs">
			<a href="/projects/{$page.params.projectId}" class="button button-cta rounded-full">
				<MonitorPlay />
				{m.explore()}
			</a>
			<a href="/edit/projects" class="button rounded-full">
				<Undo2 />
				{m.my_projects()}
			</a>
		</menu>
	</div>
{/snippet}

{#snippet sidebar()}
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_essentials()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/projects/${data.id}`)}>
			<FileText />
			{m.project_general()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/place`)}
			aria-disabled="true"
		>
			<MapPin />
			{m.project_place()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/exemplarity#exemplarity-markers`)}
		>
			<Tags />
			{m.project_examplarity()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/projects/${data.id}/gallery#new-images`)}>
			<Images />
			{m.project_gallery()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_complements()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/projects/${data.id}/contributions`)}>
			<Users />
			{m.project_contributions()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/materials`)}
			aria-disabled="true"
		>
			<Cuboid />
			{m.project_materials()}
		</DashboardSidebarMenuItem>
		<DashboardSidebarMenuItem
			{...linkAttributes(`/edit/projects/${data.id}/timeline`)}
			aria-disabled="true"
		>
			<Calendar />
			{m.project_timeline()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_settings()}
		{/snippet}
		<DashboardSidebarMenuItem {...linkAttributes(`/edit/projects/${data.id}/manage`)}>
			<TriangleAlert />
			{m.project_sharing_and_management()}
		</DashboardSidebarMenuItem>
	</DashboardSidebarMenu>
	<DashboardSidebarMenuProjects />
	<DashboardSidebarMenuOrganizations />
{/snippet}

{@render children()}
