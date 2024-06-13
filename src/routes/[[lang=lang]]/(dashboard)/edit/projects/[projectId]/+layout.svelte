<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { getDashboardContext } from '$lib/components/patterns/dashboard.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { onDestroy } from 'svelte';

	let { children, data } = $props();

	const ctx = getDashboardContext(true);
	ctx.sidebar = sidebar;
	ctx.header = header;

	onDestroy(() => {
		ctx.sidebar = undefined;
		ctx.header = undefined;
	});
</script>

{#snippet header()}
	<div class="bg-card rounded-section p-card-padding flex-1">
		<hgroup>
			<h1 class="heading xl">
				{#if data.title}
					{data.title}
				{:else}
					<span class="fallback">
						{m.project_untitled()}
					</span>
				{/if}
			</h1>
		</hgroup>
		<menu>
			<a {...linkAttributes('/edit/projects')} class="button button-ghost compact">
				{m.projects()}
			</a>
		</menu>
	</div>
{/snippet}

{#snippet sidebar()}
	<DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_essentials()}
		{/snippet}
		<a class="button button-nav" {...linkAttributes(`/edit/projects/${data.id}`)}>
			{m.project_general()}
		</a>
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/place#dashboard-main`)}
			aria-disabled="true"
		>
			{m.project_place()}
		</a>
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/exemplarity#dashboard-main`)}
		>
			{m.project_examplarity()}
		</a>
		<a
			class="button button-nav"
			{...linkAttributes(`/edit/projects/${data.id}/gallery#dashboard-main`)}
		>
			{m.project_gallery()}
		</a>
	</DashboardSidebarMenu>
	<!-- <DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_complements()}
		{/snippet}
		<SidebarItem
			{...linkAttributes(`/edit/projects/${data.id}/contributions#dashboard-main`)}
			aria-disabled
		>
			{m.project_contributions()}
		</SidebarItem>
		<SidebarItem
			{...linkAttributes(`/edit/projects/${data.id}/materials#dashboard-main`)}
			aria-disabled
		>
			{m.project_materials()}
		</SidebarItem>
		<SidebarItem
			{...linkAttributes(`/edit/projects/${data.id}/timeline#dashboard-main`)}
			aria-disabled
		>
			{m.project_timeline()}
		</SidebarItem>
	</DashboardSidebarMenu> -->
	<!-- <DashboardSidebarMenu>
		{#snippet legend()}
			{m.project_settings()}
		{/snippet}
		<SidebarItem
			{...linkAttributes(`/edit/projects/${data.id}/sharing#dashboard-main`)}
			aria-disabled
		>
			{m.project_sharing()}
			<Users2 class="button-icon" />
		</SidebarItem>
		<SidebarItem
			{...linkAttributes(`/edit/projects/${data.id}/publishing#dashboard-main`)}
			aria-disabled
		>
			{m.project_visibility()}
			<Eye class="button-icon" />
		</SidebarItem>
		<SidebarItem {...linkAttributes(`/edit/projects/${data.id}/security#dashboard-main`)} danger>
			{m.project_danger_zone()}
			<AlertTriangle class="button-icon" />
		</SidebarItem>
	</DashboardSidebarMenu> -->
	<!-- <DashboardSidebarMenu>
		{#snippet legend()}
			{m.my_documents()}
		{/snippet}
		<SidebarItem {...linkAttributes('/edit/projects')}>
			{m.projects()}
			<Files class="button-icon" />
		</SidebarItem>
		{#if $page.data.user?.role === ROLES.ADMIN || $page.data.user?.role === ROLES.EDITOR}
			<SidebarItem {...linkAttributes('/edit/projects/descriptors')}>
				{m.project_descriptors()}
				<Tags class="button-icon" />
			</SidebarItem>
		{/if}
		<SidebarItem {...linkAttributes('/edit/organizations')}>
			{m.orgs()}
			<Files class="button-icon" />
		</SidebarItem>
		{#if $page.data.user?.role === ROLES.ADMIN || $page.data.user?.role === ROLES.EDITOR}
			<SidebarItem {...linkAttributes('/edit/organizations/descriptors')}>
				{m.organization_descriptors()}
				<Tags class="button-icon" />
			</SidebarItem>
		{/if}
	</DashboardSidebarMenu> -->
{/snippet}

{@render children()}

<style>
	:global {
		.project-dashboard-section-header {
			font-size: var(--font-size-sm);
			/* background: var(--background-color-base); */
			border-radius: var(--radius-section);
			padding: var(--spacing-card-padding);
			border: var(--border-width-md) dashed
				color-mix(in srgb, var(--color-primary) var(--opacity-dim), transparent);
		}
	}
</style>
