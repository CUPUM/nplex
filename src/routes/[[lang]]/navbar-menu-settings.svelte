<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { availableLanguageTags, languageTag } from '$i18n/runtime';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import { LOAD_DEPENDENCIES } from '$lib/common/constants';
	import NavbarMenuGroup from '$lib/components/patterns/navbar-menu-group.svelte';
	import NavbarMenuItem from '$lib/components/patterns/navbar-menu-item.svelte';
	import NavbarMenu from '$lib/components/patterns/navbar-menu.svelte';
	import { i18n } from '$lib/i18n/adapter';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { THEME_SETTINGS_ARR, THEME_SETTINGS_DETAILS } from '$lib/theme/constants';
	import type { Snippet } from 'svelte';
	import { theme } from './theme-provider.svelte';

	let { trigger }: { trigger: Snippet<[Dialog['triggerAttributes']]> } = $props();

	const dialog = new Dialog();

	let withoutLang = $derived(i18n.route($page.url.pathname));
</script>

{@render trigger(dialog.triggerAttributes)}
<NavbarMenu {dialog}>
	<NavbarMenuGroup {...dialog.contentAttributes} intro={{ delay: 0 }} outro={{ delay: 75 }}>
		{#snippet legend()}
			{m.language()}
		{/snippet}
		{#each availableLanguageTags as lang}
			<NavbarMenuItem
				href={withoutLang}
				hreflang={lang}
				rel="alternate"
				data-sveltekit-noscroll
				data-sveltekit-replacestate
				aria-checked={languageTag() === lang || undefined}
				role="radio"
				onclick={() => invalidate(LOAD_DEPENDENCIES.LANG)}
			>
				{LANG_DETAILS[lang].name}
			</NavbarMenuItem>
		{/each}
	</NavbarMenuGroup>
	<NavbarMenuGroup {...dialog.contentAttributes} intro={{ delay: 75 }} outro={{ delay: 0 }}>
		{#snippet legend()}
			{m.screen_mode()}
		{/snippet}
		{#each THEME_SETTINGS_ARR as option}
			{@const details = THEME_SETTINGS_DETAILS[option]}
			<NavbarMenuItem
				aria-checked={theme.setting === option || undefined}
				role="radio"
				onclick={() => {
					theme.setting = option;
				}}
			>
				<details.icon />
				{details.title()}
			</NavbarMenuItem>
		{/each}
	</NavbarMenuGroup>
</NavbarMenu>
