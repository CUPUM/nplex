<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { ripple } from '$lib/actions/ripple';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { i18nlink, i18nswitch } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { MODES_DETAILS } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import { SETOUTS } from '$lib/setout/constants';
	import { setout } from '$lib/setout/store';
	import { transform } from '$lib/transitions/transform';
	import { KEYS } from '$lib/utils/constants';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { Languages, LogOut, User } from 'lucide-svelte';
	import { cubicIn, expoIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import LogoSvg from './LogoSvg.svelte';
	import Tooltip from './Tooltip.svelte';

	const t = createTranslations({
		fr: {
			about: 'À propos',
			guides: 'Guides',
			projects: 'Projets',
			organizations: 'Organisations',
			login: 'Me connecter',
			logout: 'Me déconnecter',
		},
		en: {
			about: 'About',
			guides: 'Guides',
			projects: 'Projects',
			organizations: 'Organizations',
			login: 'Log in',
			logout: 'Log out',
		},
	});

	function navripple(node: HTMLElement) {
		return ripple(node, {
			color: 'var(--color-primary-500)',
			opacityStart: 0.2,
		});
	}

	const {
		elements: { menu: localeMenu, item: localeItem, trigger: localeTrigger, arrow: localeArrow },
		states: { open: localeOpen },
	} = createDropdownMenu({ forceVisible: true });

	const {
		elements: { menu: userMenu, item: userItem, trigger: userTrigger, arrow: userArrow },
		states: { open: userOpen },
	} = createDropdownMenu({ forceVisible: true });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<header
	style:--width-setout={$setout === SETOUTS.FULL_SCREEN || $setout === SETOUTS.FULL_WIDTH
		? '100%'
		: undefined}
>
	<div class="inner">
		<!-- General nav -->
		<nav id="general-group" class="group">
			<a id="logobutton" class="navbutton" use:navripple {...$i18nlink('/')}>
				<LogoSvg id="navbutton-logo" />
			</a>
			<a class="navbutton" use:navripple {...$i18nlink('/about')}>{$t.about}</a>
			<a class="navbutton" use:navripple {...$i18nlink('/guides')}>{$t.guides}</a>
		</nav>
		<!-- Exploration nav -->
		<nav id="exploration-group" class="group">
			<a class="navbutton" use:navripple {...$i18nlink('/projects')}>{$t.projects}</a>
			<a class="navbutton" use:navripple {...$i18nlink('/organizations')}>{$t.organizations}</a>
		</nav>
		<!-- User nav -->
		<menu id="user-group" class="group">
			{#if $page.data.user}
				<button class="navbutton avatar" use:navripple use:melt={$userTrigger}>
					{$page.data.user.email.slice(0, 1)}
				</button>
				{#if $userOpen}
					<menu
						class="dropdown"
						use:melt={$userMenu}
						in:scale={{ duration: 150, start: 0.9, easing: expoOut }}
						out:scale={{ duration: 100, start: 0.9, easing: expoIn }}
					>
						<form use:enhance method="POST" action="/?/logout" id="logout-form" hidden />
						<button class="dropdown-item" type="submit" form="logout-form">
							<LogOut size="1.5em" class="navbutton-icon" />
							{$t.logout}
						</button>
					</menu>
				{/if}
			{:else}
				<Tooltip>
					<a class="navbutton square" use:navripple {...$i18nlink('/login')}>
						<User size="1.5em" class="navbutton-icon" />
					</a>
					<svelte:fragment slot="content"></svelte:fragment>
				</Tooltip>
			{/if}
			<button class="navbutton" use:navripple use:melt={$localeTrigger}>
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
						<a
							class="dropdown-item"
							{...$i18nswitch(locale)}
							use:melt={$localeItem}
							use:navripple
							data-current={$page.data.locale === locale ? true : undefined}
						>
							{LOCALES_DETAILS[locale].name}
						</a>
					{/each}
				</menu>
			{/if}
			<button
				class="navbutton square"
				use:navripple
				on:pointerdown={mode.toggle}
				on:keydown={(e) => {
					if (e.key === KEYS.SPACE || e.key === KEYS.ENTER) {
						mode.toggle();
					}
				}}
			>
				{#key $mode}
					<div
						in:transform={{
							scale: 0.75,
							rotate: [0, 0, -90],
							duration: 500,
							delay: 200,
							easing: expoOut,
						}}
						out:transform={{ scale: 0.5, rotate: [0, 0, 90], duration: 350, easing: cubicIn }}
						class="navbutton-icon mode-icon"
					>
						<svelte:component this={MODES_DETAILS[$mode].icon} size="1.5em" />
					</div>
				{/key}
			</button>
		</menu>
	</div>
</header>

<style lang="scss">
	header {
		position: sticky;
		top: 0;
		align-self: stretch;
		padding: var(--space-sm);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.inner {
		font-weight: 500;
		flex-direction: row;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		width: 100%;
		max-width: var(--width-setout, var(--width-main));
	}

	.group {
		display: flex;
		flex-direction: row;
		gap: var(--space-2xs);
	}

	.navbutton {
		position: relative;
		display: flex;
		flex-direction: row;
		gap: var(--space-2xs);
		align-items: center;
		justify-content: center;
		height: var(--space-2xl);
		font-size: var(--size-sm);
		letter-spacing: 0.02em;
		padding-inline: var(--size-lg);
		border-radius: var(--radius-md);
		outline: 1px solid transparent;
		outline-offset: 4px;
		transition:
			all 0.1s ease-out,
			outline 0.25s ease-out,
			outline-offset 0.25s ease-out;

		&:hover:not([data-current]),
		&[data-state='open'] {
			color: var(--color-primary-500);
			background-color: color-mix(in srgb, var(--color-primary-300) 20%, transparent);

			@include dark {
				background-color: color-mix(in srgb, var(--color-primary-700) 20%, transparent);
			}
		}

		&[data-loading] {
			color: color-mix(in srgb, var(--color-neutral-500) 50%, transparent);
			transform: scale(0.8);
		}

		&:focus-visible:not([data-current]) {
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

			& :global(.navbutton-icon) {
				position: absolute;
			}
		}

		&[data-current] {
			cursor: default;
			color: var(--color-primary-500);
			box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary-500) 25%, transparent);
		}

		&#logobutton {
			box-shadow: none;
		}

		:global(#navbutton-logo) {
			height: 50%;
			width: auto;
			// position: absolute;
			// top: 25%;
			// left: 25%;
			// width: 50%;
			// height: 50%;
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
		padding: 0.3rem 0.45rem;
		opacity: 0.75;
		border-radius: var(--radius-full);
		box-shadow: 0 0 2px -0.5px currentColor;
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
		gap: 3px;
		font-weight: 500;
		background-color: var(--color-neutral-50);
		border: 1px solid var(--color-neutral-200);
		padding: var(--space-2xs);
		border-radius: var(--radius-md);
		transform-origin: top center;

		@include dark {
			background-color: var(--color-neutral-800);
			border: 1px solid var(--color-neutral-700);
		}
	}

	.dropdown-item {
		position: relative;
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 1em 1.25em;
		gap: var(--space-2xs);
		border-radius: var(--radius-sm);
		transition: all 0.1s ease-out;

		&::after {
			content: '';
			position: absolute;
			opacity: 0;
			width: 0;
			border-radius: 50%;
			background-color: var(--color-primary-500);
			aspect-ratio: 1;
			left: 6px;
			top: 50%;
			transform: translate(10px, -50%);
			transition: all 0.35s var(--ease-out-expo);
		}

		&[data-current] {
			cursor: default;
			color: var(--color-primary-600);
			// background-color: var(--color-primary-600);

			@include dark {
				color: var(--color-primary-400);
				// background-color: var(--color-primary-400);
			}
		}

		&:hover:not([data-current]),
		&:focus-visible:not([data-current]) {
			color: var(--color-primary-600);
			background-color: color-mix(in srgb, var(--color-primary-400) 15%, transparent);

			@include dark {
				color: var(--color-primary-400);
				background-color: color-mix(in srgb, var(--color-primary-700) 15%, transparent);
			}
		}
	}
</style>
