<script lang="ts" context="module">
	export function navripple(node: HTMLElement) {
		return ripple(node, {
			color: 'var(--color-primary-500)',
			opacityStart: 0.2,
		});
	}

	export const t = createTranslations({
		fr: {
			about: 'À propos',
			guides: 'Guides',
			projects: 'Projets',
			organizations: 'Organisations',
			login: 'Me connecter',
			logout: 'Me déconnecter',
			language: 'Langue',
			account: 'Mon compte',
			edit: {
				projects: 'Modifier un projet',
				organizations: 'Modifier une organisation',
			},
			new: {
				project: 'Créer un nouveau projet',
				organization: 'Créer une nouvelle organisation',
			},
		},
		en: {
			about: 'About',
			guides: 'Guides',
			projects: 'Projects',
			organizations: 'Organizations',
			login: 'Log in',
			logout: 'Log out',
			language: 'Language',
			account: 'My account',
			edit: {
				projects: 'Edit a project',
				organizations: 'Edit an organization',
			},
			new: {
				project: 'Create a new project',
				organization: 'Create a new organization',
			},
		},
	});
</script>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { ripple } from '$lib/actions/ripple';
	import { breakpoint } from '$lib/breakpoints/breakpoints';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { i18nlink, i18nswitch } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { MODES_DETAILS } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import { setout } from '$lib/setout/store';
	import { transform } from '$lib/transitions/transform';
	import { KEYS } from '$lib/utils/constants';
	import {
		createDialog,
		createDropdownMenu,
		melt,
		type CreateDropdownMenuProps,
	} from '@melt-ui/svelte';
	import { FilePlus2, Languages, LogOut, MoreHorizontal, Pencil, User2 } from 'lucide-svelte';
	import { cubicIn, expoIn, expoOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import {
		getLoadingNewOrg,
		getLoadingNewProject,
	} from '../../routes/[[locale=locale]]/Contexts.svelte';
	import Avatar from './Avatar.svelte';
	import LogoSvg from './LogoSvg.svelte';
	import NavmenuDrawer from './NavmenuDrawer.svelte';

	const MENU_OPTIONS = {
		forceVisible: true,
		positioning: {
			overflowPadding: 16,
			gutter: 6,
			placement: 'bottom',
		},
	} satisfies CreateDropdownMenuProps;

	const {
		elements: { menu: localeMenu, item: localeItem, trigger: localeTrigger },
		states: { open: localeOpen },
	} = createDropdownMenu(MENU_OPTIONS);

	const {
		elements: {
			menu: userMenu,
			item: userItem,
			trigger: userTrigger,
			arrow: userArrow,
			separator: userSeparator,
		},
		states: { open: userOpen },
	} = createDropdownMenu(MENU_OPTIONS);

	const {
		elements: { trigger: drawerTrigger, portalled: drawerPortalled, ...drawerElements },
		states: { open: drawerOpen },
	} = createDialog({ forceVisible: true });

	const { element: newProjectElement, action: newProjectAction } = getLoadingNewProject();

	const { element: newOrgElement, action: newOrgAction } = getLoadingNewOrg();
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<header class={$setout}>
	<div class="inner">
		<!-- General nav -->
		<nav id="site-group" class="group">
			<a
				id="logobutton"
				class="navbutton"
				class:square={!$breakpoint.lg}
				use:navripple
				{...$i18nlink('/')}
			>
				<LogoSvg mono={!$breakpoint.lg} />
			</a>
			{#if $breakpoint.lg}
				<a class="navbutton" use:navripple {...$i18nlink('/about')}>{$t.about}</a>
				<a class="navbutton" use:navripple {...$i18nlink('/guides')}>{$t.guides}</a>
			{:else}
				<button class="navbutton square" use:melt={$drawerTrigger}>
					<MoreHorizontal size="1.5em" />
				</button>
				<div use:melt={$drawerPortalled}>
					<NavmenuDrawer {...drawerElements} open={drawerOpen} />
				</div>
			{/if}
		</nav>
		<!-- Exploration nav -->
		{#if $breakpoint.md}
			<nav id="explore-group" class="group">
				<a class="navbutton" use:navripple {...$i18nlink('/projects')}>{$t.projects}</a>
				<a class="navbutton" use:navripple {...$i18nlink('/organizations')}>{$t.organizations}</a>
			</nav>
		{/if}
		<!-- User nav -->
		<menu id="user-group" class="group">
			{#if $page.data.user}
				<button class="navbutton square" use:navripple use:melt={$userTrigger}>
					<Avatar {...$page.data.user} />
				</button>
				{#if $userOpen}
					<menu
						class="dropdown"
						use:melt={$userMenu}
						in:scale={{ duration: 150, start: 0.9, easing: expoOut }}
						out:scale={{ duration: 100, start: 0.9, easing: expoIn }}
					>
						<span class="legend">{$t.projects}</span>
						<section class="dropdown-subgroup">
							<a {...$i18nlink('/edit/projects')} class="dropdown-item" use:melt={$userItem}>
								<Pencil size="1.25em" />{$t.edit.projects}
							</a>
							<a
								{...$i18nlink('/new/project')}
								class="dropdown-item"
								use:melt={$userItem}
								{...$newProjectElement}
								use:newProjectAction
							>
								<FilePlus2 size="1.25em" />{$t.new.project}
							</a>
						</section>
						<span class="legend">{$t.organizations}</span>
						<section class="dropdown-subgroup">
							<a {...$i18nlink('/edit/organizations')} class="dropdown-item" use:melt={$userItem}>
								<Pencil size="1.25em" />{$t.edit.organizations}
							</a>
							<a
								{...$i18nlink('/new/organization')}
								class="dropdown-item"
								use:melt={$userItem}
								{...$newOrgElement}
								use:newOrgAction
							>
								<FilePlus2 size="1.25em" />{$t.new.organization}
							</a>
						</section>
						<!-- <hr {...$userSeparator} /> -->
						<a {...$i18nlink('/i')} class="dropdown-item" use:melt={$userItem}>
							<User2 size="1.25em" />
							{$t.account}
						</a>
						<form use:enhance method="POST" action="/?/logout" id="logout-form" hidden />
						<button class="dropdown-item" type="submit" form="logout-form" use:melt={$userItem}>
							<LogOut size="1.25em" class="navbutton-icon" />
							{$t.logout}
						</button>
					</menu>
				{/if}
			{:else}
				<a class="navbutton square" use:navripple {...$i18nlink('/login')}>
					<User2 size="1.5em" class="navbutton-icon" />
				</a>
			{/if}
			{#if $breakpoint.lg}
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
								delay: 150,
								easing: expoOut,
								opacity: 1,
							}}
							out:transform={{
								scale: 0.5,
								rotate: [0, 0, 90],
								duration: 250,
								easing: cubicIn,
								opacity: 1,
							}}
							class="navbutton-icon mode-icon"
						>
							<svelte:component this={MODES_DETAILS[$mode].icon} size="1.5em" />
						</div>
					{/key}
				</button>
			{/if}
		</menu>
	</div>
</header>

<style lang="scss">
	header {
		position: sticky;
		top: 0;
		align-self: stretch;
		padding: var(--space-xs);
		display: flex;
		align-items: center;
		justify-content: center;

		@include lg {
			padding: var(--space-sm);
		}
	}

	.inner {
		font-weight: 500;
		flex-direction: row;
		display: grid;
		grid-template-columns:
			[full-start site-start]
			1fr
			[site-end explore-start]
			auto
			[explore-end user-start]
			1fr
			[user-end full-end];
		width: 100%;
		max-width: var(--width-setout, var(--width-main));
	}

	.group {
		display: flex;
		flex-direction: row;
		gap: var(--space-3xs);
	}

	.navbutton {
		position: relative;
		display: flex;
		white-space: nowrap;
		flex-direction: row;
		gap: var(--space-2xs);
		align-items: center;
		justify-content: center;
		font-size: var(--size-sm);
		height: var(--space-2xl);
		padding-inline: var(--size-md);
		border-radius: var(--radius-full);
		letter-spacing: 0.02em;
		outline: 1px solid transparent;
		outline-offset: 4px;
		transition:
			all 0.1s ease-out,
			outline 0.2s ease-out,
			outline-offset 0.2s ease-out;

		.dropdown & {
			border-radius: var(--radius-sm);
		}

		@include lg {
			padding-inline: var(--size-lg);
			border-radius: var(--radius-md);
		}

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

			@include lg {
				font-size: 1.5em;
			}
		}
	}

	#site-group {
		grid-column: site;
		justify-content: flex-start;
	}

	#explore-group {
		grid-column: explore;
		justify-content: center;
	}

	#user-group {
		grid-column: user;
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
		// border: 1px solid var(--color-neutral-200);
		// box-shadow: var(--shadow-md);
		padding: var(--space-xs);
		border-radius: var(--radius-lg);
		transform-origin: top center;
		z-index: 1;

		@include dark {
			background-color: var(--color-neutral-800);
			// border: 1px solid var(--color-neutral-700);
		}

		// hr {
		// 	border-color: black;
		// 	opacity: 0.1;
		// 	margin: var(--space-2xs);
		// 	@include dark {
		// 		border-color: white;
		// 	}
		// }
	}

	.legend {
		align-self: stretch;
		font-size: var(--size-xs);
		font-weight: 450;
		opacity: 0.5;
		padding: var(--size-xs) var(--space-sm);
	}

	.dropdown-subgroup {
		display: flex;
		flex-direction: column;
		padding: var(--space-2xs);
		// gap: var(--space-2xs);
		border-radius: var(--radius-md);
		margin-bottom: var(--space-2xs);
		background-color: white;
		border: var(--border-size) solid transparent;
		@include dark {
			background-color: rgba(255, 255, 255, 0.025);
			// border: var(--border-size) solid rgba(0, 0, 0, 0.1);
		}
	}

	.dropdown-item {
		position: relative;
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 1em 1.25em;
		gap: var(--space-sm);
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
