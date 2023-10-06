<script lang="ts" context="module">
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
				organizationsDescriptors: 'Gérer les descripteurs',
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
				organizationsDescriptors: 'Manage descriptors',
			},
			new: {
				project: 'Create a new project',
				organization: 'Create a new organization',
			},
		},
	});

	const header = hstack({
		'zIndex': '99',
		'position': 'sticky',
		'top': '0',
		'alignSelf': 'stretch',
		'padding': '.75rem 1rem',
		'alignItems': 'center',
		'justify': 'center',
		'_before': {
			content: '""',
			opacity: '0',
			position: 'absolute',
			inset: '0',
			transition: 'all 1s ease-out',
			background: 'linear-gradient({colors.neutral.100}, transparent)',
			_dark: {
				background: 'linear-gradient({colors.neutral.900}, transparent)',
			},
		},
		'&[data-over]': {
			_before: {
				opacity: '1',
			},
		},
	});

	const inner = grid({
		flexDirection: 'row',
		gridTemplateColumns:
			'[full-start site-start] 1fr [site-end explore-start] auto [explore-end user-start] 1fr [user-end full-end]',
		width: '100%',
		maxWidth: 'content.main',
		transitionProperty: 'max-width',
		transitionDuration: 'slow',
		transitionTimingFunction: 'ease-expo',
		_setoutFullWidth: {
			maxWidth: '100%',
		},
		_setoutFullScreen: {
			maxWidth: '100%',
		},
	});

	const button = cva({
		base: {
			'--button-size': '3.5rem',
			'--button-padding': '1.1em',
			'--button-radius': 'radii.base',
			'cursor': 'pointer',
			'position': 'relative',
			'display': 'flex',
			'fontWeight': '600',
			'whiteSpace': 'nowrap',
			'flexDirection': 'row',
			'gap': '.5rem',
			'alignItems': 'center',
			'justifyContent': 'center',
			'height': 'calc(var(--button-size) - 2 * var(--group-inset, 0px))',
			'paddingInline': 'calc(var(--button-padding) - var(--group-inset, 0px))',
			'borderRadius': 'calc(var(--button-radius) - var(--group-inset, 0px))',
			'letterSpacing': '0.02em',
			'outline': '1px solid transparent',
			'outlineOffset': '4px',
			'backdropFilter': 'blur(8px)',
			'transition': 'all 0.1s ease-out, outline 0.2s ease-out, outline-offset 0.2s ease-out',
			'_hover': {
				'color': 'primary.700',
				'backgroundColor': 'primary.500/.1',
				'_dark': {
					color: 'primary.500',
					backgroundColor: 'primary.600/.1',
				},
				'& .button-icon': {
					strokeWidth: '2.75',
					scale: '.92',
				},
			},
			'_open': {
				'zIndex': '1',
				'color': 'primary.700',
				'backgroundColor': 'primary.500/.1',
				'_dark': {
					color: 'primary.500',
					backgroundColor: 'primary.600/.1',
				},
				'& .button-icon': {
					strokeWidth: '3',
				},
			},
			'_focusVisible': {
				zIndex: '1',
				outlineOffset: '2px',
				outlineWidth: '2px',
				outlineStyle: 'solid',
				outlineColor: 'primary.500/.5',
			},
			'_currentPage': {
				'cursor': 'default',
				'color': 'primary.600',
				'outlineOffset': '0',
				'outlineWidth': '3px',
				'outlineColor': 'primary.600/.75',
				'_dark': {
					color: 'primary.500',
					outlineColor: 'primary.500/.5',
				},
				'& .button-icon': {
					strokeWidth: '3',
				},
			},
			'& .button-icon': {
				strokeLinecap: 'round',
				strokeLinejoin: 'miter',
				strokeWidth: '2.5',
				height: '1.25em',
				scale: '1',
				transition: 'all .5s ease-out',
			},
		},
		variants: {
			aspect: {
				square: {
					paddingInline: '0',
					aspectRatio: '1',
				},
			},
			special: {
				logo: {
					outlineColor: 'transparent !important',
				},
				grouped: {
					outlineColor: 'transparent !important',
					backdropFilter: 'unset',
				},
			},
		},
	});

	const group = cva({
		base: {
			display: 'flex',
			flexDirection: 'row',
			gap: '.25rem',
		},
		variants: {
			group: {
				site: {
					gridColumn: 'site',
					justifyContent: 'flex-start',
				},
				explore: {
					'--group-inset': '3px',
					'zIndex': '1',
					'gridColumn': 'explore',
					'justifyContent': 'center',
					'backgroundColor': 'neutral.950/.05',
					'borderRadius': 'base',
					'padding': 'var(--group-inset)',
					'backdropFilter': 'blur(8px)',
					'_dark': {
						backgroundColor: 'neutral.50/.05',
					},
				},
				user: {
					gridColumn: 'user',
					justifyContent: 'flex-end',
				},
			},
		},
	});

	const needle = css({
		position: 'absolute',
		zIndex: '-1',
		inset: '0',
		borderRadius: 'inherit',
		backgroundColor: 'neutral.50',
		outlineWidth: '3px',
		outlineStyle: 'solid',
		outlineColor: 'primary.600/.75',
		_dark: {
			backgroundColor: 'neutral.900',
		},
	});

	const localeLabel = css({
		fontSize: 'x-small',
		paddingBlock: '.5em',
		paddingInline: '1em',
		opacity: '.75',
		borderRadius: 'full',
		boxShadow: '0 0 2px -0.5px currentcolor',
		transitionProperty: 'all',
		transitionDuration: 'fast',
		transitionTimingFunction: 'ease-out',
		_groupHover: {
			color: 'neutral.100',
			backgroundColor: 'primary.700',
			boxShadow: '0 0 0 -.5px currentcolor',
			opacity: '1',
			_dark: {
				color: 'neutral.900',
				backgroundColor: 'primary.400',
			},
		},
		_groupOpen: {
			color: 'neutral.100',
			backgroundColor: 'primary.700',
			boxShadow: '0 0 0 -.5px currentcolor',
			opacity: '1',
			_dark: {
				color: 'neutral.900',
				backgroundColor: 'primary.400',
			},
		},
	});

	const menu = css({
		'--menu-inset': '0.5rem',
		'display': 'flex',
		'flexDirection': 'column',
		'gap': '0',
		'fontWeight': '500',
		'boxShadow': 'lg',
		'padding': 'var(--menu-inset)',
		'borderRadius': 'base',
		'transformOrigin': 'top center',
		'backgroundColor': 'neutral.50',
		'zIndex': '1',
		'_dark': {
			backgroundColor: 'neutral.800',
		},
	});

	const menuGroup = css({
		'position': 'relative',
		'display': 'flex',
		'flexDirection': 'column',
		'paddingBottom': `calc(2 * var(--menu-inset))`,
		'paddingInline': 'var(--menu-inset)',
		'marginBlock': 'var(--menu-inset)',
		'&:not(:last-child)': {
			_after: {
				content: '""',
				position: 'absolute',
				left: `calc(-1 * var(--menu-inset))`,
				right: `calc(-1 * var(--menu-inset))`,
				bottom: '0',
				opacity: '.1',
				borderBottom: 'base',
				borderColor: 'neutral.500',
				_dark: {
					opacity: '.5',
					borderColor: 'neutral.900',
				},
			},
		},
	});

	const menuLegend = css({
		alignSelf: 'flex-start',
		fontSize: 'x-small',
		fontWeight: '400',
		opacity: '.4',
		padding: '0.5em 0.75em',
		marginInline: 'var(--menu-inset)',
		marginBottom: '1em',
		borderRadius: 'full',
		backgroundColor: 'neutral.500/.1',
	});

	const menuItem = css({
		'cursor': 'pointer',
		'userSelect': 'none',
		'position': 'relative',
		'fontSize': 'small',
		'display': 'flex',
		'flexDirection': 'row',
		'alignItems': 'center',
		'justifyContent': 'space-between',
		'padding': '0.8em 1em',
		'gap': '1em',
		'borderRadius': 'sm',
		'transitionProperty': 'all',
		'transitionDuration': 'fast',
		'transitionTimingFunction': 'ease-out',
		'_disabled': {
			pointerEvents: 'none',
			opacity: '0.35',
			filter: 'blur(1px)',
		},
		'_hover': {
			'color': 'primary.700',
			'backgroundColor': 'primary.700/.1',
			'_dark': {
				color: 'primary.500',
				backgroundColor: 'primary.500/.1',
			},
			'& .button-icon': {
				opacity: '1',
				translate: '.15em 0',
			},
		},
		'_focusVisible': {
			'color': 'primary.700',
			'backgroundColor': 'primary.700/.1',
			'_dark': {
				color: 'primary.500',
				backgroundColor: 'primary.500/.1',
			},
			'& .button-icon': {
				opacity: '1',
				translate: '.15em 0',
			},
		},
		'_currentPage': {
			'cursor': 'default',
			'color': 'primary.600',
			'_dark': {
				color: 'primary.400',
			},
			'& .button-icon': {
				opacity: '1',
			},
		},
		'& .button-icon': {
			strokeWidth: '2.5',
			width: '1em',
			opacity: '0.35',
			transition: 'all ease-out',
			transitionDuration: 'medium',
		},
	});

	function menuIn(node: Element) {
		return scale(node, { duration: 150, start: 0.9, easing: expoOut });
	}

	function menuOut(node: Element) {
		return fly(node, { duration: 100, y: -6, easing: expoIn });
	}
</script>

<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { ripple } from '$lib/actions/ripple';
	import { breakpoint } from '$lib/breakpoints/breakpoints';
	import Avatar from '$lib/components/Avatar.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { LOCALES_ARR, LOCALES_DETAILS } from '$lib/i18n/constants';
	import { i18nhref } from '$lib/i18n/href';
	import { i18nswitch, link } from '$lib/i18n/link';
	import { createTranslations } from '$lib/i18n/translate';
	import { MODES, MODES_DETAILS } from '$lib/modes/constants';
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
		MoreHorizontal,
		Pencil,
		Sliders,
		User2,
	} from 'lucide-svelte';
	import { css, cva, cx } from 'styled-system/css';
	import { grid, hstack } from 'styled-system/patterns';
	import { onMount } from 'svelte';
	import { circInOut, cubicIn, expoIn, expoOut } from 'svelte/easing';
	import { crossfade, fly, scale } from 'svelte/transition';
	import { getLoadingNewOrg, getLoadingNewProject } from './Contexts.svelte';
	import NavbarDrawer from './NavbarDrawer.svelte';

	function navripple(node: HTMLElement) {
		return ripple(node, {
			color: $mode === MODES.LIGHT ? 'var(--color-primary-900)' : 'var(--color-primary-200)',
			opacityStart: 0.2,
		});
	}

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

	const { element: newProjectElement, action: newProjectAction } = getLoadingNewProject(true);

	const { element: newOrgElement, action: newOrgAction } = getLoadingNewOrg(true);

	const [sendExplore, receiveExplore] = crossfade({
		duration: 175,
		easing: circInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.9, duration: 150, easing: expoOut });
		},
	});

	let scrollY = 0;
	let mounted = false;

	function flyin(node: HTMLElement, i: number) {
		return fly(node, { y: '25%', duration: 750, easing: expoOut, delay: i * 75 });
	}

	onNavigate(() => {
		userOpen.set(false);
	});

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:window bind:scrollY />

<!-- svelte-ignore a11y-missing-attribute -->
{#if mounted && $setout && $breakpoint}
	<header id="navbar" class={header} data-over={scrollY > 10 || undefined}>
		<div class={inner}>
			<!-- General nav -->
			<nav class={group({ group: 'site' })} in:flyin|global={0}>
				<a
					class={button({ aspect: !$breakpoint.md ? 'square' : undefined, special: 'logo' })}
					{...$link('/')}
					use:navripple
				>
					<Logo mono={!$breakpoint.md} size={$breakpoint.md ? '1.75em' : '1em'} />
				</a>
				{#if $breakpoint.lg}
					<a class={button()} use:navripple {...$link('/about')}>{$t.about}</a>
					<a class={button()} use:navripple {...$link('/guides')}>{$t.guides}</a>
				{:else}
					<button class={button({ aspect: 'square' })} use:melt={$drawerTrigger} use:navripple>
						<MoreHorizontal class="button-icon" />
					</button>
					<div use:melt={$drawerPortalled}>
						<NavbarDrawer {...drawerElements} open={drawerOpen} />
					</div>
				{/if}
			</nav>
			<!-- Exploration nav -->
			{#if $breakpoint.md}
				<nav class={group({ group: 'explore' })} in:flyin|global={1}>
					{#each exploreSections as exp}
						{@const link = $link(`/${exp}`)}
						<a class={button({ special: 'grouped' })} {...link} use:navripple>
							{#if link['data-current']}
								<div
									class={needle}
									in:receiveExplore={{ key: 'explore' }}
									out:sendExplore={{ key: 'explore' }}
								/>
							{/if}
							{$t[exp]}
						</a>
					{/each}
				</nav>
			{/if}
			<!-- User nav -->
			<menu class={group({ group: 'user' })} in:flyin|global={2}>
				{#if $breakpoint.lg}
					<button class={cx(button(), 'group')} use:melt={$localeTrigger} use:navripple>
						<Languages class="button-icon" />
						<span class={localeLabel}>
							{LOCALES_DETAILS[$page.data.locale].label}
						</span>
					</button>
					{#if $localeOpen}
						<menu in:menuIn out:menuOut class={menu} use:melt={$localeMenu}>
							{#each LOCALES_ARR as locale}
								<a
									{...$i18nswitch(locale)}
									use:melt={$localeItem}
									class={menuItem}
									use:navripple
									data-current={$page.data.locale === locale ? true : undefined}
								>
									{LOCALES_DETAILS[locale].name}
								</a>
							{/each}
						</menu>
					{/if}
					<button
						class={css(button.raw({ aspect: 'square' }), { overflow: 'hidden' })}
						on:pointerdown={mode.toggle}
						on:keydown={(e) => {
							if (e.key === KEYS.SPACE || e.key === KEYS.ENTER) {
								mode.toggle();
							}
						}}
						use:navripple
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
								class={css({ position: 'absolute', transformOrigin: 'center 250%' })}
							>
								<svelte:component this={MODES_DETAILS[$mode].icon} class="button-icon" />
							</div>
						{/key}
					</button>
				{/if}
				{#if $page.data.user}
					<button class={button({ aspect: 'square' })} use:melt={$userTrigger} use:navripple>
						<Avatar {...$page.data.user} />
					</button>
					{#if $userOpen}
						<menu in:menuIn out:menuOut class={menu} use:melt={$userMenu}>
							<div class={menuGroup}>
								<span class={menuLegend}>
									{$t.projects}
								</span>
								<a class={menuItem} use:navripple {...$link('/edit/projects')} use:melt={$userItem}>
									{$t.edit.projects}
									<Pencil class="button-icon" />
								</a>
								<a class={menuItem} use:navripple {...$link('/new/project')} use:melt={$userItem}>
									{$t.new.project}
									<FilePlus2 class="button-icon" />
								</a>
								<a
									class={menuItem}
									use:navripple
									{...$link('/edit/projects/descriptors')}
									use:melt={$userItem}
								>
									{$t.edit.projectDescriptors}
									<Sliders class="button-icon" />
								</a>
							</div>
							<div class={menuGroup}>
								<span class={menuLegend}>{$t.organizations}</span>
								<a
									class={menuItem}
									use:navripple
									{...$link('/edit/organizations')}
									use:melt={$userItem}
								>
									{$t.edit.organizations}
									<Pencil class="button-icon" />
								</a>
								<a
									class={menuItem}
									use:navripple
									{...$link('/new/organization')}
									use:melt={$userItem}
								>
									{$t.new.organization}
									<FilePlus2 class="button-icon" />
								</a>
								<a
									class={menuItem}
									use:navripple
									{...$link('/edit/organizations/descriptors')}
									data-disabled
									use:melt={$userItem}
								>
									{$t.edit.organizationsDescriptors}
									<Sliders class="button-icon" />
								</a>
							</div>
							<a class={menuItem} use:navripple {...$link('/i')} use:melt={$userItem}>
								{$t.account}
								<User2 class="button-icon" />
							</a>
							<form
								method="POST"
								action="/?/logout"
								id="logout-form"
								hidden
								use:enhance={({ formElement, formData, action, cancel }) => {
									return async ({ result }) => {
										await applyAction(result);
									};
								}}
							/>
							<button
								type="submit"
								form="logout-form"
								class={menuItem}
								use:navripple
								use:melt={$userItem}
							>
								{$t.logout}
								<LogOut class="button-icon" />
							</button>
						</menu>
					{/if}
				{:else}
					{@const link = $link('/login')}
					<a
						use:navripple
						class={button({ aspect: 'square' })}
						{...link}
						data-current={$page.url.pathname.startsWith($i18nhref('/signup')) ||
							$page.url.pathname.startsWith($i18nhref('/reset-password')) ||
							link['data-current'] ||
							undefined}
					>
						<User2 class="button-icon" />
					</a>
				{/if}
			</menu>
		</div>
	</header>
{:else}
	<div class={css({ position: 'sticky', top: '0', height: 'navbar' })}></div>
{/if}
