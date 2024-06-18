<script lang="ts">
	import { page } from '$app/stores';
	import { availableLanguageTags, type AvailableLanguageTag } from '$i18n/runtime';
	import { Tabs } from '$lib/builders/tabs.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { switchThumbCrossfade } from '$lib/motion/presets';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { get } from 'svelte/store';

	let {
		children,
		class: className,
		...divProps
	}: {
		children: Snippet<
			[{ lang: AvailableLanguageTag; current?: AvailableLanguageTag; isCurrent: boolean }]
		>;
	} & Omit<HTMLAttributes<HTMLDivElement>, 'children'> = $props();

	const tabs = new Tabs({ defaultValue: get(page).data.lang });
	const key = {};
</script>

<div class="input-group self-stretch {className}" {...divProps}>
	{#each availableLanguageTags as lang}
		<div class="translation-content" {...tabs.contentAttributes(lang)} hidden={false} {lang}>
			{@render children({ lang, current: tabs.current, isCurrent: tabs.current === lang })}
		</div>
	{/each}
	<div class="input-peer">
		<menu class="switch switch-ghost compact rounded-full">
			{#each availableLanguageTags as lang}
				<button
					class="switch-item"
					use:ripple
					{...tabs.triggerAttributes(lang)}
					{lang}
					type="button"
				>
					{LANG_DETAILS[lang].label}
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
	</div>
</div>

<style>
	.translation-content {
		display: flex;
		flex: 1;
		flex-direction: row;
		opacity: 1;
		transform-origin: bottom left;
		transition: all var(--transition-duration-medium) var(--transition-timing-function-out);
	}

	.translation-content[aria-expanded='false'] {
		visibility: collapse;
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
		pointer-events: none;
		translate: 0 0.5em;
		transition: none;
	}
</style>
