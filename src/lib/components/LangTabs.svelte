<script lang="ts">
	import { page } from '$app/stores';
	import { availableLanguageTags, type AvailableLanguageTag } from '$i18n/runtime';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { switchThumbCrossfade } from '$lib/motion/presets';
	import { checked } from '$lib/utils/attributes';
	import SwitchThumb from './SwitchThumb.svelte';

	export let lang: AvailableLanguageTag = $page.data.lang;

	const key = {};
	const [send, receive] = switchThumbCrossfade;
</script>

<menu class="switch rounded">
	{#each availableLanguageTags as tag}
		{@const isCurrent = tag === lang}
		<label class="switch-item" {...checked(isCurrent)}>
			<input class="visually-hidden" type="radio" bind:group={lang} value={tag} />
			<SwitchThumb {key} current={isCurrent} />
			{LANG_DETAILS[tag].name}
		</label>
	{/each}
</menu>

<style>
	menu {
		font-size: var(--size-sm);
	}
</style>
