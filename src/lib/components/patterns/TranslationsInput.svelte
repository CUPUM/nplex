<script lang="ts">
	import { page } from '$app/stores';
	import { availableLanguageTags, type AvailableLanguageTag } from '$i18n/runtime';
	import { Tabs } from '$lib/builders/tabs.svelte';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { switchCrossfade } from '$lib/motion/presets';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet<[{ lang: AvailableLanguageTag; current: boolean }]> } =
		$props();

	const tabs = new Tabs({ defaultValue: $page.data.lang });
	const [send, receive] = switchCrossfade;
	const key = {};
</script>

<div class="input-group">
	{#each availableLanguageTags as lang}
		<div class="lang-content" {...tabs.contentAttributes(lang)} {lang}>
			{@render children({ lang, current: tabs.current === lang })}
		</div>
	{/each}
	<div class="input-peer">
		<menu class="switch compact rounded" use:ripple>
			{#each availableLanguageTags as lang}
				<button class="switch-item" {...tabs.triggerAttributes(lang)} {lang} type="button">
					{LANG_DETAILS[lang].label}
					{#if tabs.current === lang}
						<div in:send={{ key }} out:receive={{ key }} class="switch-thumb"></div>
					{/if}
				</button>
			{/each}
		</menu>
	</div>
</div>

<!-- <style>
	.input-group {
		align-self: stretch;
	}

	.lang-content {
		display: flex;
		flex-direction: row;
		flex: 1;
		flex-direction: row;
		transform: translateX(0);
		opacity: 1;
		transition:
			all var(--duration-slow) var(--ease-out-expo),
			flex 0s,
			width 0s,
			margin 0s;
	}

	.lang-content[hidden] {
		flex: none;
		pointer-events: none;
		visibility: collapse;
		transform: translateX(0.5em);
		opacity: 0;
		height: 0;
		width: 0;
		margin: 0;
		transition: none;
	}

	.input-peer {
		height: var(--base-block-size);
		align-items: center;
		padding-right: 0.35em;
		flex: none;
	}

	.switch {
		font-size: var(--size-xs);
	}
</style> -->
