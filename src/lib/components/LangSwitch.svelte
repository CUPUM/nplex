<!--
	@component
	Switch for locales. Use in conjunction with AvailableLanguageTagTabs
-->
<script lang="ts">
	import { availableLanguageTags } from '$i18n/runtime';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { switchThumbCrossfade } from '$lib/motion/presets';
	import { melt, type TabsElements, type TabsStates } from '@melt-ui/svelte';

	export let list: TabsElements['list'];
	export let trigger: TabsElements['trigger'];
	export let lang: TabsStates['value'];

	const [send, receive] = switchThumbCrossfade;
	const key = {};
</script>

<menu use:melt={$list} class="switch compact" use:ripple>
	{#each availableLanguageTags as _lang}
		<button class="switch-item" use:melt={$trigger(_lang)} lang={_lang} type="button">
			{#if $lang === _lang}
				<div in:send={{ key }} out:receive={{ key }} class="switch-thumb" />
			{/if}
			{LANG_DETAILS[_lang].label}
		</button>
	{/each}
</menu>

<style>
	menu {
		font-size: var(--size-xs);
	}
</style>
