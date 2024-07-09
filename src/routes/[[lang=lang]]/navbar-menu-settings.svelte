<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { availableLanguageTags } from '$i18n/runtime';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import { LOAD_DEPENDENCIES } from '$lib/common/constants';
	import NavbarMenuGroup from '$lib/components/patterns/navbar-menu-group.svelte';
	import NavbarMenuItem from '$lib/components/patterns/navbar-menu-item.svelte';
	import NavbarMenu from '$lib/components/patterns/navbar-menu.svelte';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { removeLang, withLang } from '$lib/i18n/location';
	import { MODE_SETTINGS_ARR, MODE_SETTINGS_DETAILS } from '$lib/modes/constants';
	import type { Snippet } from 'svelte';
	import { mode } from './mode-provider.svelte';

	let { trigger }: { trigger: Snippet<[Dialog['triggerAttributes']]> } = $props();

	const dialog = new Dialog();

	let withoutLang = $derived(removeLang($page.url.pathname));
</script>

{@render trigger(dialog.triggerAttributes)}
<NavbarMenu {dialog}>
	<NavbarMenuGroup {...dialog.contentAttributes} intro={{ delay: 0 }}>
		{#snippet legend()}
			{m.language()}
		{/snippet}
		{#each availableLanguageTags as lang}
			<NavbarMenuItem
				href={withLang(withoutLang, lang)}
				hreflang={lang}
				data-sveltekit-noscroll
				data-sveltekit-replacestate
				aria-checked={$page.data.lang === lang || undefined}
				role="radio"
				onclick={() => invalidate(LOAD_DEPENDENCIES.LANG)}
			>
				{LANG_DETAILS[lang].name}
			</NavbarMenuItem>
		{/each}
	</NavbarMenuGroup>
	<NavbarMenuGroup {...dialog.contentAttributes} intro={{ delay: 150 }}>
		{#snippet legend()}
			{m.screen_mode()}
		{/snippet}
		{#each MODE_SETTINGS_ARR as option}
			<NavbarMenuItem
				aria-checked={mode.setting === option || undefined}
				role="radio"
				onclick={() => {
					mode.setting = option;
				}}
			>
				<svelte:component this={MODE_SETTINGS_DETAILS[option].icon} />
				{MODE_SETTINGS_DETAILS[option].title()}
			</NavbarMenuItem>
		{/each}
	</NavbarMenuGroup>
</NavbarMenu>
