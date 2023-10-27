<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { switchCrossfade } from '$lib/transitions/presets';
	import { melt, type TabsElements, type TabsStates } from '@melt-ui/svelte';

	export let list: TabsElements['list'];
	export let trigger: TabsElements['trigger'];
	export let value: TabsStates['value'];

	const [send, receive] = switchCrossfade;
	const key = {};
</script>

<menu use:melt={$list} class="switch compact" use:ripple>
	{#each LOCALES_ARR as locale}
		<button class="switch-item" use:melt={$trigger(locale)} lang={locale} type="button">
			{LOCALES_DETAILS[locale].label}
			{#if $value === locale}
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
