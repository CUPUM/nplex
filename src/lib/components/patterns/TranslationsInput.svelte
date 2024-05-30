<script lang="ts">
	import { page } from '$app/stores';
	import { availableLanguageTags, type AvailableLanguageTag } from '$i18n/runtime';
	import { ripple } from '$lib/components/primitives/ripple.svelte';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { switchCrossfade } from '$lib/motion/presets';
	import { createTabs, melt } from '@melt-ui/svelte';

	export let defaultLang: AvailableLanguageTag = $page.data.lang;
	export let lang: AvailableLanguageTag | undefined = undefined;

	const {
		elements: { root, trigger, list, content },
		states: { value: _value },
	} = createTabs({
		defaultValue: lang ?? defaultLang,
		loop: true,
		activateOnFocus: true,
		onValueChange: ({ curr, next }) => {
			lang = next as AvailableLanguageTag;
			return next;
		},
	});

	$: if (lang) {
		_value.set(lang);
	}

	const [send, receive] = switchCrossfade;

	const key = {};
</script>

<div class="input-group" use:melt={$root}>
	{#each availableLanguageTags as lang}
		<div class="lang-content" {lang} use:melt={$content(lang)}>
			<slot {lang} value={$_value} current={$_value === lang} />
		</div>
	{/each}
	<div class="input-peer">
		<menu use:melt={$list} class="switch compact rounded" use:ripple>
			{#each availableLanguageTags as lang}
				<button class="switch-item" use:melt={$trigger(lang)} {lang} type="button">
					{LANG_DETAILS[lang].label}
					{#if $_value === lang}
						<div in:send={{ key }} out:receive={{ key }} class="switch-thumb" />
					{/if}
				</button>
			{/each}
		</menu>
	</div>
</div>

<style>
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
</style>
