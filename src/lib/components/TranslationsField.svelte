<script lang="ts">
	import { page } from '$app/stores';
	import { availableLanguageTags, type AvailableLanguageTag } from '$i18n/runtime';
	import { createTabs, melt } from '@melt-ui/svelte';
	import LangSwitch from './LangSwitch.svelte';

	export let defaultValue: AvailableLanguageTag = $page.data.lang;

	const {
		elements: { root, trigger, list, content },
		states: { value },
	} = createTabs({ defaultValue, loop: true, activateOnFocus: true });
</script>

<fieldset class="label-group" use:melt={$root}>
	<legend class="label">
		<div class="legend-slot">
			<slot name="legend" />
		</div>
		<LangSwitch {trigger} {list} lang={value} />
	</legend>
	{#each availableLanguageTags as lang}
		<div class="content" {lang} use:melt={$content(lang)}>
			<slot {lang} {value} current={$value === lang} />
		</div>
	{/each}
</fieldset>

<style lang="postcss">
	.label-group {
		position: relative;
		gap: 0;
		width: 65ch;
		max-width: 100%;
	}

	/* .content:not([hidden]) { */
	.content {
		display: flex;
		flex-direction: column;
		font-size: var(--size-sm);
		transform: translateY(0);
		opacity: 1;
		margin-top: 0.5rem;
		transition:
			all var(--duration-slow) ease-out,
			margin-top 0s;
	}

	.content[hidden] {
		pointer-events: none;
		visibility: collapse;
		transform: translateY(-0.5em);
		opacity: 0;
		height: 0;
		margin-top: 0;
		transition: none;
	}

	.label {
		font-size: var(--size-md);
	}

	.centered {
		align-self: center;
		max-width: var(--width-md);
		width: 100%;

		@container (width > 1200px) {
			margin-right: var(--dashboard-navbar);
		}
	}
</style>
