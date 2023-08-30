<script lang="ts">
	import { page } from '$app/stores';
	import { ripple } from '$lib/actions/ripple';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { i18nlink, i18nswitch } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { MODES_DETAILS } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import { transform } from '$lib/transitions/transform';
	import { KEYS } from '$lib/utils/constants';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { Languages, User } from 'lucide-svelte';
	import { expoIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	const t = createTranslations({
		fr: {
			about: 'À propos',
			guides: 'Guides',
			projects: 'Projets',
			organizations: 'Organisations',
			login: 'Me connecter',
		},
		en: {
			about: 'About',
			guides: 'Guides',
			projects: 'Projects',
			organizations: 'Organizations',
			login: 'Login',
		},
	});

	const {
		elements: { menu: localeMenu, item: localeItem, trigger: localeTrigger, arrow: localeArrow },
		states: { open: localeOpen },
	} = createDropdownMenu({ forceVisible: true });

	const {
		elements: { menu: userMenu, item: userItem, trigger: userTrigger, arrow: userArrow },
		states: { open: userOpen },
	} = createDropdownMenu({ forceVisible: true });

	const {
		elements: {
			menu: settingsMenu,
			item: settingsItem,
			trigger: settingsTrigger,
			arrow: settingsArrow,
		},
		states: { open: settingsOpen },
	} = createDropdownMenu({ forceVisible: true });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<header>
	<!-- General nav -->
	<nav id="general-group" class="group">
		<a class="button" use:ripple {...$i18nlink('/')}>N</a>
		<a class="button" use:ripple {...$i18nlink('/about')}>{$t.about}</a>
		<a class="button" use:ripple {...$i18nlink('/guides')}>{$t.guides}</a>
	</nav>
	<!-- Exploration nav -->
	<nav id="exploration-group" class="group">
		<a class="button" use:ripple {...$i18nlink('/projects')}>{$t.projects}</a>
		<a class="button" use:ripple {...$i18nlink('/organizations')}>{$t.organizations}</a>
	</nav>
	<!-- User nav -->
	<menu id="user-group" class="group">
		{#if $page.data.user}
			<button class="button avatar" use:ripple use:melt={$userTrigger}>
				{$page.data.user.email.slice(0, 1)}
			</button>
			{#if $userOpen}
				<menu
					class="dropdown"
					use:melt={$userMenu}
					transition:transform={{ scale: 0.5, translate: [0, -5] }}
				>
					User yé! :D
				</menu>
			{/if}
		{:else}
			<a class="button square" use:ripple {...$i18nlink('/signup')}>
				<User size="1.5em" style="button-icon" />
			</a>
		{/if}
		<button class="button" use:ripple use:melt={$localeTrigger}>
			<Languages size="1.5em" />
			<span id="locale-label">{LOCALES_DETAILS[$page.data.locale].label}</span>
		</button>
		{#if $localeOpen}
			<menu
				class="dropdown"
				use:melt={$localeMenu}
				in:scale={{ duration: 150, start: 0.9, easing: expoOut }}
				out:scale={{ duration: 100, start: 0.9, easing: expoIn }}
			>
				{#each LOCALES_ARR as locale}
					<a class="dropdown-item" {...$i18nswitch(locale)} use:melt={$localeItem}>
						{LOCALES_DETAILS[locale].name}
					</a>
				{/each}
			</menu>
		{/if}
		<button
			class="button square"
			use:ripple
			on:pointerdown={mode.toggle}
			on:keydown={(e) => {
				if (e.key === KEYS.SPACE || e.key === KEYS.ENTER) {
					mode.toggle();
				}
			}}
		>
			{#key $mode}
				<div
					in:transform={{ scale: 0.75, rotate: [0, 0, 90], duration: 500, easing: expoOut }}
					out:transform={{ scale: 0.75, rotate: [0, 0, -90], duration: 750, easing: expoOut }}
					class="button-icon mode-icon"
				>
					<svelte:component this={MODES_DETAILS[$mode].icon} size="1.5em" />
				</div>
			{/key}
		</button>
	</menu>
</header>

<style lang="scss">
	header {
		position: sticky;
		top: 0;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-self: stretch;
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
		gap: var(--space-2xs);
		align-items: center;
		justify-content: center;
		height: var(--space-2xl);
		font-size: var(--size-sm);
		font-weight: 450;
		letter-spacing: 0.02em;
		padding-inline: var(--size-lg);
		border-radius: var(--radius-md);
		outline: 1px solid transparent;
		outline-offset: 4px;
		transition:
			all 0.1s ease-out,
			outline 0.25s ease-out,
			outline-offset 0.25s ease-out;

		&:hover,
		&[data-state='open'] {
			color: var(--color-primary-500);
			background-color: color-mix(in hsl, var(--color-primary-300) 20%, transparent);

			@include dark {
				background-color: color-mix(in hsl, var(--color-primary-800) 20%, transparent);
			}
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
			overflow: hidden;

			& :global(.button-icon) {
				position: absolute;
			}
		}
	}

	#general-group {
	}

	#exploration-group {
		justify-content: center;
	}

	#user-group {
		justify-content: flex-end;
	}

	.mode-icon {
		transform-origin: center 200%;
	}

	#locale-label {
		display: flex;
		align-items: center;
		font-size: var(--size-xs);
		padding: 0.35rem 0.5rem;
		opacity: 0.75;
		border-radius: var(--radius-full);
		box-shadow: 0 0 2px -0.5px currentColor;
		font-weight: 400;
		transition: all 0.1s ease-out;

		.button:hover &,
		.button[data-state='open'] & {
			color: var(--color-neutral-100);
			background-color: var(--color-primary-600);
			box-shadow: 0 0 0 -0.5px currentColor;
			opacity: 1;

			@include dark {
				color: var(--color-neutral-900);
				background-color: var(--color-primary-400);
			}
		}
	}

	.dropdown {
		display: flex;
		flex-direction: column;
		background-color: white;
		box-shadow: var(--shadow-xs);
		padding: var(--space-2xs);
		border-radius: var(--radius-md);
		transform-origin: top center;

		@include dark {
			background-color: var(--color-neutral-800);
		}
	}

	.dropdown-item {
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: var(--space-sm) var(--space-md);
		gap: var(--space-2xs);
		border-radius: var(--radius-sm);
		transition: all 0.2s ease-out;

		&:hover,
		&:focus-visible {
			background-color: var(--color-neutral-200);

			@include dark {
				background-color: var(--color-neutral-700);
			}
		}
	}
</style>
