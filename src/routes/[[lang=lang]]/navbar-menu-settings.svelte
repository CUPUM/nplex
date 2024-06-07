<script lang="ts">
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { availableLanguageTags } from '$i18n/runtime';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
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
			in:fly|global={{ x: 20, duration: 1000, easing: expoOut }}
			out:fly={{ x: 50, duration: 200, easing: cubicIn, delay: 75 }}
		>
			<span class="navbar-menu-group-legend">
				{m.language()}
			</span>
			<ul class="navbar-menu-group-items">
				{#each availableLanguageTags as lang}
					<a
						use:ripple
						href={withLang(withoutLang, lang)}
						hreflang={lang}
						data-sveltekit-noscroll
						data-sveltekit-replacestate
						aria-checked={$page.data.lang === lang || undefined}
						role="radio"
						class="button button-ghost justify-start"
					>
						{LANG_DETAILS[lang].name}
					</a>
				{/each}
			</ul>
		</menu>
		<menu
			class="navbar-menu-group"
			in:fly|global={{ x: 20, duration: 1000, easing: expoOut, delay: 200 }}
			out:fly={{ x: 50, duration: 200, easing: cubicIn, delay: 0 }}
		>
			<span class="navbar-menu-group-legend">
				{m.screen_mode()}
			</span>
			<ul class="navbar-menu-group-items">
				{#each MODE_SETTINGS_ARR as option}
					<button
						use:ripple
						class="button button-ghost justify-start"
						aria-checked={mode.setting === option || undefined}
						role="radio"
						onclick={() => {
							mode.setting = option;
						}}
					>
						<svelte:component this={MODE_SETTINGS_DETAILS[option].icon} />
						{MODE_SETTINGS_DETAILS[option].title()}
					</button>
				{/each}
			</ul>
		</menu>
	</dialog>
{/if}
