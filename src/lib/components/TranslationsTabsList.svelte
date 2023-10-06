<script lang="ts">
	import { ripple } from '$lib/actions/ripple';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { melt, type TabsElements, type TabsStates } from '@melt-ui/svelte';
	import { switchGroup } from 'styled-system/recipes';
	import { expoOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	export let list: TabsElements['list'];
	export let trigger: TabsElements['trigger'];
	export let value: TabsStates['value'];

	const [send, receive] = crossfade({ duration: 150, easing: expoOut });

	const tabs = switchGroup({ shape: 'rounded' });
</script>

<menu use:melt={$list} class={tabs.root}>
	{#each LOCALES_ARR as locale}
		<button
			class={tabs.trigger}
			use:ripple={{ color: 'white', opacityStart: 0.25 }}
			use:melt={$trigger(locale)}
			lang={locale}
		>
			{LOCALES_DETAILS[locale].label}
			{#if $value === locale}
				<div in:send={{ key: 'locale' }} out:receive={{ key: 'locale' }} class={tabs.thumb} />
			{/if}
		</button>
	{/each}
</menu>
