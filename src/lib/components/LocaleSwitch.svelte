<!--
	@component
	Switch for locales. Use in conjunction with LocaleTabs
-->
<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { switchCrossfade } from '$lib/transitions/presets';
	import { melt, type TabsElements, type TabsStates } from '@melt-ui/svelte';

	export let list: TabsElements['list'];
	export let trigger: TabsElements['trigger'];
	export let locale: TabsStates['value'];

	const [send, receive] = switchCrossfade;
	const key = {};
</script>

<menu use:melt={$list} class="switch compact" use:ripple>
	{#each LOCALES_ARR as _locale}
		<button class="switch-item" use:melt={$trigger(_locale)} lang={_locale} type="button">
			{LOCALES_DETAILS[_locale].label}
			{#if $locale === _locale}
				<div in:send={{ key }} out:receive={{ key }} class="switch-thumb" />
			{/if}
		</button>
	{/each}
</menu>

<style lang="postcss">
	menu {
		font-size: var(--size-xs);
	}
</style>
