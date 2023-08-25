<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { i18nlink, i18nswitch } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { THEMES_ARR, THEMES_DETAILS, THEMES_TRANSLATIONS } from '$lib/modes/constants';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { IconLanguage } from '@tabler/icons-svelte';
	import { fly } from 'svelte/transition';

	const t = createTranslations({
		fr: {
			about: 'À propos',
			guides: 'Guides',
			projects: 'Projets',
		},
		en: {
			about: 'About',
			guides: 'Guides',
			projects: 'Projects',
		},
	});

	const {
		elements: { menu: localeMenu, item: localeItem, trigger: localeTrigger, arrow: localeArrow },
	} = createDropdownMenu();

	const {
		elements: { menu: themeMenu, item: themeItem, trigger: themeTrigger, arrow: themeArrow },
	} = createDropdownMenu();
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<header>
	<nav class="group">
		<a class="button" {...$i18nlink('/about')}>{$t.about}</a>
		<a class="button" {...$i18nlink('/guides')}>{$t.guides}</a>
		<a class="button" {...$i18nlink('/projects')}>{$t.projects}</a>
	</nav>
	<!-- User nav -->
	<nav class="group"></nav>
	<!-- User settings -->
	<menu class="group">
		<button class="button" use:melt={$localeTrigger}>
			<IconLanguage stroke={1.75} size="1.5em" />
			<span id="locale-label">{LOCALES_DETAILS[$page.data.locale].label}</span>
		</button>
		<menu class="dropdown" use:melt={$localeMenu}>
			{#each LOCALES_ARR as locale}
				<a class="dropdown-item" {...$i18nswitch(locale)} use:melt={$localeItem}>
					{LOCALES_DETAILS[locale].name}
				</a>
			{/each}
		</menu>
		<button class="button" use:melt={$themeTrigger}>{$THEMES_TRANSLATIONS.label}</button>
		<menu class="dropdown" use:melt={$themeMenu} in:fly>
			{#each THEMES_ARR as theme}
				<button class="dropdown-item" use:melt={$themeItem}>
					<svelte:component this={THEMES_DETAILS[theme].icon} />
					{$THEMES_TRANSLATIONS[theme]}
				</button>
			{/each}
		</menu>
	</menu>
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
	}

	.group {
		display: flex;
		flex-direction: row;
		gap: var(--space-2xs);
	}

	.button {
		position: relative;
		display: flex;
		flex-direction: row;
		gap: var(--space-3xs);
		align-items: center;
		justify-content: flex-start;
		height: var(--space-2xl);
		font-size: var(--size-sm);
		font-weight: 450;
		letter-spacing: 0.02em;
		padding-inline: var(--size-lg);
		border-radius: var(--radius-sm);
		background-color: white;

		&:focus,
		&[data-state='open'] {
			z-index: 1;
			outline: 3px solid red;
		}
	}

	#locale-label {
		display: flex;
		align-items: center;
		font-size: var(--size-xs);
		padding: 0.5rem 0.75rem;
		background-color: rgba(0, 0, 0, 0.1);
		opacity: 0.75;
		border-radius: var(--radius-full);
		font-weight: 500;
	}

	.dropdown {
		display: flex;
		flex-direction: column;
		background-color: white;
		box-shadow: 0 1rem 2rem -1rem rgba(0, 0, 0, 0.2);
		padding: var(--space-sm);
		border-radius: var(--radius-sm);
	}

	.dropdown-item {
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0.25rem;
		gap: var(--space-2xs);
	}
</style>
