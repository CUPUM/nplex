<script lang="ts">
	import * as m from '$i18n/messages';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import NavbarMenuGroup from '$lib/components/patterns/navbar-menu-group.svelte';
	import NavbarMenuItem from '$lib/components/patterns/navbar-menu-item.svelte';
	import NavbarMenu from '$lib/components/patterns/navbar-menu.svelte';
	import { linkAttributes } from '$lib/components/primitives/link.svelte';
	import { Building2, DraftingCompass, Search } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let { trigger }: { trigger: Snippet<[Dialog['triggerAttributes']]> } = $props();

	const dialog = new Dialog();
</script>

{@render trigger(dialog.triggerAttributes)}
<NavbarMenu {dialog}>
	<NavbarMenuGroup {...dialog.contentAttributes} intro={{ delay: 0 }} outro={{ delay: 150 }}>
		<NavbarMenuItem {...linkAttributes('/')} {...dialog.itemAttributes}>
			{m.home()}
		</NavbarMenuItem>
		<NavbarMenuItem {...linkAttributes('/about')} {...dialog.itemAttributes}>
			{m.about()}
		</NavbarMenuItem>
		<NavbarMenuItem {...linkAttributes('/guides')} {...dialog.itemAttributes}>
			{m.guides()}
		</NavbarMenuItem>
	</NavbarMenuGroup>
	<NavbarMenuGroup {...dialog.contentAttributes} intro={{ delay: 0 }} outro={{ delay: 150 }}>
		{#snippet legend()}
			<Search />
			{m.explore()}
		{/snippet}
		<NavbarMenuItem {...linkAttributes('/projects')} {...dialog.itemAttributes}>
			<DraftingCompass />
			{m.projects()}
		</NavbarMenuItem>
		<NavbarMenuItem {...linkAttributes('/organizations')} {...dialog.itemAttributes}>
			<Building2 />
			{m.organizations()}
		</NavbarMenuItem>
	</NavbarMenuGroup>
</NavbarMenu>
