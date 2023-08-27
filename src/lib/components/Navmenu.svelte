<script lang="ts">
	import { page } from '$app/stores';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { i18nlink, i18nswitch } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { MODES_DETAILS } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import { ripple } from '$lib/ripple/action';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { IconLanguage, IconUser } from '@tabler/icons-svelte';
	import { expoOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	const t = createTranslations({
		fr: {
			about: 'À propos',
			guides: 'Guides',
			projects: 'Projets',
			login: 'Me connecter',
		},
		en: {
			about: 'About',
			guides: 'Guides',
			projects: 'Projects',
			login: 'Login',
		},
	});

	const {
		elements: { menu: localeMenu, item: localeItem, trigger: localeTrigger, arrow: localeArrow },
		states: { open: localeOpen },
	} = createDropdownMenu({ forceVisible: true });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<header>
	<nav class="group">
		<a class="button" use:ripple {...$i18nlink('/')}>N</a>
		<a class="button" use:ripple {...$i18nlink('/about')}>{$t.about}</a>
		<a class="button" use:ripple {...$i18nlink('/guides')}>{$t.guides}</a>
		<a class="button" use:ripple {...$i18nlink('/projects')}>{$t.projects}</a>
	</nav>
	<!-- User nav -->
	<nav class="group">
		<a class="button square" {...$i18nlink('/signup')}>
			<IconUser size="1.5em" class="button-icon" />
		</a>
	</nav>
	<!-- User settings -->
	<menu class="group">
		<button class="button" use:melt={$localeTrigger}>
			<IconLanguage size="1.5em" />
			<span id="locale-label">{LOCALES_DETAILS[$page.data.locale].label}</span>
		</button>
		{#if $localeOpen}
			<menu class="dropdown" use:melt={$localeMenu} transition:fly={{ y: -5 }}>
				{#each LOCALES_ARR as locale}
					<a class="dropdown-item" {...$i18nswitch(locale)} use:melt={$localeItem}>
						{LOCALES_DETAILS[locale].name}
					</a>
				{/each}
			</menu>
		{/if}
		<button class="button square" use:ripple on:pointerdown={mode.toggle}>
			{#key $mode}
				<div transition:scale={{ start: 0, duration: 350, easing: expoOut }} class="button-icon">
					<svelte:component this={MODES_DETAILS[$mode].icon} size="1.5em" />
				</div>
			{/key}
		</button>
	</menu>
</header>

<style lang="scss">
	header {
		display: flex;
		flex-direction: row;
		padding: var(--space-sm);
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
		justify-content: center;
		height: var(--space-2xl);
		font-size: var(--size-sm);
		font-weight: 450;
		letter-spacing: 0.02em;
		padding-inline: var(--size-lg);
		border-radius: var(--radius-sm);
		outline: 1px solid transparent;
		outline-offset: 4px;
		transition:
			all 0.1s ease-out,
			outline 0.25s ease-out,
			outline-offset 0.25s ease-out;

		&:hover {
			background-color: color-mix(in hsl, var(--color-primary-500) 20%, transparent);
		}

		&:focus-visible {
			z-index: 1;
			outline: 3px solid color-mix(in hsl, var(--color-primary-500) 50%, transparent);
			outline-offset: 0;
		}

		&[data-state='open'] {
			z-index: 1;
		}

		&.square {
			aspect-ratio: 1;
			padding: 0;
			:global(.button-icon) {
				position: absolute;
			}
		}

		&:hover :global(.button-icon) {
			// scale: 1.1;
		}
	}

	:global(.button-icon) {
		// transition: scale 0.25s ease-out;
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
