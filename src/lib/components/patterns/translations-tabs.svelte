<script lang="ts">
	import { availableLanguageTags, languageTag, type AvailableLanguageTag } from '$i18n/runtime';
	import { Tabs } from '$lib/builders/tabs.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { switchThumbCrossfade } from '$lib/motion/presets';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		tab,
		class: className,
		...divProps
	}: {
		tab: Snippet<
			[{ lang: AvailableLanguageTag; current?: AvailableLanguageTag; isCurrent: boolean }]
		>;
	} & Omit<HTMLAttributes<HTMLDivElement>, 'children'> = $props();

	const tabs = new Tabs({ defaultValue: languageTag() });
	const key = {};
</script>

<div class="flex flex-col gap-[1em] self-stretch {className}" {...divProps}>
	<menu
		class="switch switch-bordered top-sticky-top sticky z-1 self-start text-xs backdrop-blur-md"
	>
		{#each availableLanguageTags as lang}
			<button
				class="switch-item gap-input-gap flex flex-row"
				{...tabs.triggerAttributes(lang)}
				{lang}
				type="button"
				use:ripple
			>
				{LANG_DETAILS[lang].name}
				{#if tabs.current === lang}
					<div
						in:switchThumbCrossfade.send={{ key }}
						out:switchThumbCrossfade.receive={{ key }}
						class="switch-thumb"
					></div>
				{/if}
			</button>
		{/each}
	</menu>
	{#each availableLanguageTags as lang}
		<fieldset class="translation-tab" {...tabs.contentAttributes(lang)} hidden={false} {lang}>
			{@render tab({ lang, current: tabs.current, isCurrent: tabs.current === lang })}
		</fieldset>
	{/each}
</div>

<style>
	.translation-tab {
		opacity: 1;
		gap: 1em;
		display: flex;
		flex-direction: column;
		transition: all var(--transition-duration-slow) var(--transition-timing-function-out);
	}

	.translation-tab[aria-expanded='false'] {
		visibility: collapse;
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
		pointer-events: none;
		scale: 1.02;
		transition: none;
	}
</style>
