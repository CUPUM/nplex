<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { availableLanguageTags } from '$i18n/runtime';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import { LOAD_DEPENDENCIES } from '$lib/common/constants';
	import NavbarMenuItem from '$lib/components/patterns/navbar-menu-item.svelte';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { removeLang, withLang } from '$lib/i18n/location';
	import { MODE_SETTINGS_ARR, MODE_SETTINGS_DETAILS } from '$lib/modes/constants';
	import type { Snippet } from 'svelte';
	import { cubicIn, expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { mode } from './mode-provider.svelte';

	let { trigger }: { trigger: Snippet<[Dialog['triggerAttributes']]> } = $props();

	const menu = new Dialog();

	let withoutLang = $derived(removeLang($page.url.pathname));
</script>

{@render trigger(menu.triggerAttributes)}
{#if menu.open}
	<dialog class="navbar-menu" use:menu.dialogAction {...menu.dialogAttributes} data-meta-modal>
		<menu
			class="navbar-menu-group"
			{...menu.contentAttributes}
			in:fly|global={{ x: 20, duration: 1000, easing: expoOut }}
			out:fly={{ x: 50, duration: 200, easing: cubicIn, delay: 75 }}
		>
			<span class="navbar-menu-group-legend">
				{m.language()}
			</span>
			<ul class="navbar-menu-group-items">
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
			</ul>
		</menu>
		<menu
			class="navbar-menu-group"
			in:fly|global={{ x: 20, duration: 1000, easing: expoOut, delay: 200 }}
			out:fly={{ x: 50, duration: 200, easing: cubicIn, delay: 0 }}
			{...menu.contentAttributes}
		>
			<span class="navbar-menu-group-legend">
				{m.screen_mode()}
			</span>
			<ul class="navbar-menu-group-items">
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
			</ul>
		</menu>
	</dialog>
{/if}
