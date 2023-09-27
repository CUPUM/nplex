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
				projectDescriptors: 'Gérer les descripteurs',
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
				projectDescriptors: 'Manage descriptors',
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
	import { onNavigate } from '$app/navigation';
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
	import {
		FilePlus2,
		Languages,
		LogOut,
		MailWarning,
		MoreHorizontal,
		Pencil,
		Sliders,
		User2,
	} from 'lucide-svelte';
	import { cubicIn, expoIn, expoOut, quadInOut } from 'svelte/easing';
	import { crossfade, scale } from 'svelte/transition';
	import {
		getLoadingNewOrg,
		getLoadingNewProject,
	} from '../../routes/[[locale=locale]]/Contexts.svelte';
	import Avatar from './Avatar.svelte';
	import LogoSvg from './LogoSvg.svelte';
	import NavbarDrawer from './NavbarDrawer.svelte';

	const dropdownMenuOptions = {
		forceVisible: true,
		positioning: {
			overflowPadding: 16,
			gutter: 6,
			placement: 'bottom',
		},
		preventScroll: false,
		portal: '#navbar',
	} satisfies CreateDropdownMenuProps;

	const exploreSections = ['projects', 'organizations'] as const;

	const {
		elements: { menu: localeMenu, item: localeItem, trigger: localeTrigger },
		states: { open: localeOpen },
	} = createDropdownMenu(dropdownMenuOptions);

	const {
		elements: {
			menu: userMenu,
			item: userItem,
			trigger: userTrigger,
			arrow: userArrow,
			separator: userSeparator,
		},
		states: { open: userOpen },
	} = createDropdownMenu(dropdownMenuOptions);

	const {
		elements: { trigger: drawerTrigger, portalled: drawerPortalled, ...drawerElements },
		states: { open: drawerOpen },
	} = createDialog({ forceVisible: true });

	const { element: newProjectElement, action: newProjectAction } = getLoadingNewProject();

	const { element: newOrgElement, action: newOrgAction } = getLoadingNewOrg();

	const [sendExplore, receiveExplore] = crossfade({
		duration: 150,
		easing: quadInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.9 });
		},
	});

	let scrollY = 0;

	onNavigate(() => {
		userOpen.set(false);
	});
</script>

<svelte:window bind:scrollY />

<!-- svelte-ignore a11y-missing-attribute -->
<header id="navbar" class={$setout} class:over={scrollY > 10}>
	<div class="inner">
		<!-- General nav -->
		<nav id="site-group" class="group">
			<a
				id="logo-button"
				class="nav-button"
				class:square={!$breakpoint.lg}
				use:navripple
				{...$i18nlink('/')}
			>
				<LogoSvg mono={!$breakpoint.lg} />
			</a>
			{#if $breakpoint.lg}
				<a class="nav-button" use:navripple {...$i18nlink('/about')}>{$t.about}</a>
				<a class="nav-button" use:navripple {...$i18nlink('/guides')}>{$t.guides}</a>
			{:else}
				<button class="nav-button square" use:melt={$drawerTrigger}>
					<MoreHorizontal class="nav-button-icon" />
				</button>
				<div use:melt={$drawerPortalled}>
					<NavbarDrawer {...drawerElements} open={drawerOpen} />
				</div>
			{/if}
		</nav>
		<!-- Exploration nav -->
		{#if $breakpoint.md}
			<nav id="explore-group" class="group">
				{#each exploreSections as es}
					<a class="nav-button" use:navripple {...$i18nlink(`/${es}`)}>
						{#if $page.url.pathname.replace('/', '').startsWith(es)}
							<div
								class="needle"
								in:receiveExplore={{ key: 'explore' }}
								out:sendExplore={{ key: 'explore' }}
							/>
						{/if}
						{$t[es]}
					</a>
				{/each}
			</nav>
		{/if}
		<!-- User nav -->
		<menu id="user-group" class="group">
			{#if $page.data.user}
				<button class="nav-button square" use:navripple use:melt={$userTrigger}>
					<Avatar {...$page.data.user} />
					{#if !$page.data.user.emailVerified}
						<div class="badge">
							<MailWarning />
						</div>
					{/if}
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
								<Pencil class="dropdown-icon" />{$t.edit.projects}
							</a>
							<a
								{...$i18nlink('/new/project')}
								class="dropdown-item"
								use:melt={$userItem}
								{...$newProjectElement}
								use:newProjectAction
							>
								<FilePlus2 class="dropdown-icon" />{$t.new.project}
							</a>
							<a {...$i18nlink('/edit/projects/descriptors')} class="dropdown-item">
								<Sliders class="dropdown-icon" />
								{$t.edit.projectDescriptors}
							</a>
						</section>
						<span class="legend">{$t.organizations}</span>
						<section class="dropdown-subgroup">
							<a {...$i18nlink('/edit/organizations')} class="dropdown-item" use:melt={$userItem}>
								<Pencil class="dropdown-icon" />{$t.edit.organizations}
							</a>
							<a
								{...$i18nlink('/new/organization')}
								class="dropdown-item"
								use:melt={$userItem}
								{...$newOrgElement}
								use:newOrgAction
							>
								<FilePlus2 class="dropdown-icon" />{$t.new.organization}
							</a>
						</section>
						<!-- <hr {...$userSeparator} /> -->
						<a {...$i18nlink('/i')} class="dropdown-item" use:melt={$userItem}>
							<User2 class="dropdown-icon" />
							{$t.account}
						</a>
						<form method="POST" action="/logout" id="logout-form" hidden />
						<button class="dropdown-item" type="submit" form="logout-form" use:melt={$userItem}>
							<LogOut class="nav-button-icon" />
							{$t.logout}
						</button>
					</menu>
				{/if}
			{:else}
				{@const attrs = $i18nlink('/login')}
				<a
					class="nav-button square"
					use:navripple
					{...attrs}
					data-current={attrs['data-current'] ||
						$page.url.pathname.startsWith('/signup') ||
						$page.url.pathname.startsWith('/reset-password') ||
						undefined}
				>
					<User2 class="nav-button-icon" />
				</a>
			{/if}
			{#if $breakpoint.lg}
				<button class="nav-button" use:navripple use:melt={$localeTrigger}>
					<Languages class="nav-button-icon" />
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
					class="nav-button square"
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
							style:position="absolute"
							style:transform-origin="center 200%"
						>
							<svelte:component this={MODES_DETAILS[$mode].icon} class="nav-button-icon" />
						</div>
					{/key}
				</button>
			{/if}
		</menu>
	</div>
</header>

<style lang="scss">
	header {
		--button-size: 3rem;
		--button-padding: 1.125em;
		--button-radius: var(--radius-full);
		z-index: 99;
		position: sticky;
		top: 0;
		align-self: stretch;
		padding: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		// backdrop-filter: blur(6px);

		@include lg {
			--button-radius: var(--input-radius);
			padding: 0.75rem;
		}

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			opacity: 0;
			transition: opacity 0.5s;
		}

		&.over {
			&::before {
				opacity: 1;
				background: linear-gradient(var(--color-neutral-100), transparent);
				// background-color: var(--color-neutral-100);
				@include dark {
					background: linear-gradient(var(--color-neutral-900), transparent);
					// background-color: var(--color-neutral-900);
				}
			}
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
		max-width: var(--width-main);
		transition: max-width 0.35s var(--ease-expo);

		.full-width & {
			max-width: 100%;
		}
	}

	.group {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;
	}

	.nav-button {
		position: relative;
		display: flex;
		white-space: nowrap;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		font-size: var(--size-sm);
		height: calc(var(--button-size) - 2 * var(--button-inset, 0px));
		padding-inline: calc(1.25em - var(--button-inset, 0px));
		border-radius: calc(var(--button-radius) - var(--button-inset, 0px));
		letter-spacing: 0.02em;
		outline: 1px solid transparent;
		outline-offset: 4px;
		backdrop-filter: blur(8px);
		transition:
			all 0.1s ease-out,
			outline 0.2s ease-out,
			outline-offset 0.2s ease-out;

		@include lg {
			padding-inline: var(--size-lg);
		}

		&:hover:not([data-current]),
		&[data-state='open'] {
			color: var(--color-primary-700);
			background-color: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
			@include dark {
				color: var(--color-primary-500);
				background-color: color-mix(in srgb, var(--color-primary-600) 10%, transparent);
			}

			:global(.nav-button-icon) {
				stroke-width: 2.75;
			}
		}

		&[data-loading] {
			color: color-mix(in srgb, var(--color-neutral-500) 50%, transparent);
			transform: scale(0.8);
		}

		&:focus-visible:not([data-current]) {
			z-index: 1;
			outline: 2px solid color-mix(in hsl, var(--color-primary-500) 50%, transparent);
			outline-offset: 2px;
		}

		&[data-state='open'] {
			z-index: 1;
		}

		&.square {
			aspect-ratio: 1;
			padding: 0;
			overflow: hidden;
		}

		&[data-current]:not(#logo-button) {
			cursor: default;
			color: var(--color-primary-500);
			outline: 3px solid color-mix(in hsl, var(--color-primary-500) 50%, transparent);
			outline-offset: 0;

			:global(.nav-button-icon) {
				stroke-width: 3;
			}
		}

		&#logo-button {
			@include lg {
				font-size: 1.5em;
			}
		}

		& :global(.nav-button-icon) {
			stroke-width: 2.5;
			height: 1.25em;
			transition: stroke-width 0.25s ease-out;
		}
	}

	#site-group {
		grid-column: site;
		justify-content: flex-start;
	}

	#explore-group {
		z-index: 1;
		--button-inset: 4px;
		grid-column: explore;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.035);
		border-radius: var(--button-radius);
		padding: var(--button-inset);
		backdrop-filter: blur(8px);
		@include dark {
			background-color: rgba(255, 255, 255, 0.05);
		}

		.nav-button {
			backdrop-filter: unset;
			span {
				position: relative;
			}
			// &[data-current] {
			// 	background-color: var(--color-neutral-100);
			// 	@include dark {
			// 		background-color: var(--color-neutral-900);
			// 	}
			// }
		}

		.needle {
			position: absolute;
			z-index: -1;
			inset: 0;
			border-radius: inherit;
			background-color: var(--color-neutral-50);
			// border: var(--border-size) solid color-mix(in srgb, var(--color-neutral-500) 20%, transparent);
			@include dark {
				background-color: var(--color-neutral-900);
			}
		}
	}

	#user-group {
		grid-column: user;
		justify-content: flex-end;
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

		.nav-button:hover &,
		.nav-button[data-state='open'] & {
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
		--button-radius: var(--radius-sm);
		--dropdown-inset: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 3px;
		font-weight: 500;
		background-color: var(--color-neutral-50);
		box-shadow: var(--shadow-lg);
		padding: var(--dropdown-inset);
		border-radius: calc(var(--button-radius) + var(--dropdown-inset));
		transform-origin: top center;
		z-index: 1;
		border: var(--border-size) solid color-mix(in srgb, var(--color-neutral-50) 20%, transparent);
		@include dark {
			background-color: var(--color-neutral-700);
			border: var(--border-size) solid color-mix(in srgb, var(--color-neutral-950) 20%, transparent);
		}
	}

	.legend {
		align-self: stretch;
		font-size: var(--size-xs);
		font-weight: 450;
		opacity: 0.5;
		padding: var(--size-xs) 1rem;
	}

	.dropdown-subgroup {
		display: flex;
		flex-direction: column;
		padding: 0.25rem;
		border-radius: var(--radius-md);
		margin-bottom: 0.5rem;
		background-color: var(--color-neutral-50);
		border: var(--border-size) solid transparent;
		@include dark {
			background-color: var(--color-neutral-800);
		}
	}

	.dropdown-item {
		position: relative;
		font-size: var(--size-sm);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 1em 1.25em;
		gap: 1rem;
		border-radius: var(--radius-sm);
		transition: all 0.1s ease-out;

		&[data-current] {
			cursor: default;
			color: var(--color-primary-600);
			@include dark {
				color: var(--color-primary-400);
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
