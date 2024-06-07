<script lang="ts">
	import * as m from '$i18n/messages';
	import DashboardSidebarMenu from '$lib/components/patterns/dashboard-sidebar-menu.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { ArrowRight } from 'lucide-svelte';
</script>

<DashboardSidebarMenu>
	{#snippet legend()}
		{m.organizations()}
	{/snippet}
	<a class="button button-nav" {...linkAttributes('/edit/projects/descriptors')}>
		{m.organization_descriptors()}
		<ArrowRight />
	</a>
	<a class="button button-nav" {...linkAttributes('/edit/projects')}>
		{m.my_orgs()}
		<ArrowRight />
	</a>
</DashboardSidebarMenu>
