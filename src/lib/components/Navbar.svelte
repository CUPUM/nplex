<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { availableLanguageTags } from '$i18n/runtime';
	import { breakpoint } from '$lib/breakpoints/breakpoints';
	import Avatar from '$lib/components/Avatar.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { langHref, langSwitch, link } from '$lib/i18n/link';
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
	import { onMount } from 'svelte';
	import { circInOut, cubicIn, expoOut } from 'svelte/easing';
	import { crossfade, fly, scale } from 'svelte/transition';
	import LangKey from './LangKey.svelte';
	import NavbarButton from './NavbarButton.svelte';
	import NavbarDrawer from './NavbarDrawer.svelte';
	import NavbarMenu from './NavbarMenu.svelte';
	import NavbarMenuButton from './NavbarMenuButton.svelte';
	import NavbarMenuGroup from './NavbarMenuGroup.svelte';

	const dropdownMenuOptions = {
		forceVisible: true,
		positioning: {
			overflowPadding: 12,
			gutter: 10.5, // navbar padding - border-base-size
			placement: 'bottom',
		},
		preventScroll: false,
		portal: '#navbar',
	} satisfies CreateDropdownMenuProps;

	const explore = [
		{ key: 'projects', title: m.projects },
		{ key: 'organizations', title: m.orgs },
	] satisfies { key: string; title: () => string }[];

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

	const [sendExplore, receiveExplore] = crossfade({
		duration: 175,
		easing: circInOut,
		fallback(node, params, intro) {
			return scale(node, { start: 0.9, duration: 150, easing: expoOut });
		},
	});

	let scrollY = 0;
	let navbar: HTMLElement;
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
	<header
		id="navbar"
		bind:this={navbar}
		class={$setout}
		class:over={scrollY > 10 && !$page.data.navbar?.noBackground}
	>
		<div class="inner">
			<!-- General nav -->
			<nav id="site-group" class="navbar-group" in:flyin|global={0}>
				<NavbarButton square={!$breakpoint.md} {...$link('/')} outline={false}>
					<Logo mono={!$breakpoint.md} size={$breakpoint.md ? '1.75em' : '1em'} />
				</NavbarButton>
				{#if $breakpoint.lg}
					<NavbarButton {...$link('/about')}>
						<LangKey>
							{m.about()}
						</LangKey>
					</NavbarButton>
					<NavbarButton {...$link('/guides')}>
						<LangKey>
							{m.guides()}
						</LangKey>
					</NavbarButton>
				{:else}
					<NavbarButton square dialog={drawerTrigger}>
						<MoreHorizontal class="button-icon" />
					</NavbarButton>
					<div use:melt={$drawerPortalled}>
						<NavbarDrawer {...drawerElements} open={drawerOpen} />
					</div>
				{/if}
			</nav>
			<!-- Exploration nav -->
			{#if $breakpoint.md}
				<nav id="explore-group" class="navbar-group" in:flyin|global={1}>
					{#each explore as ex}
						{@const link = $link(`/${ex.key}`)}
						<NavbarButton {...link} outline={false}>
							{#if link['data-current']}
								<div
									class="needle"
									in:receiveExplore={{ key: 'explore' }}
									out:sendExplore={{ key: 'explore' }}
								/>
							{/if}
							<LangKey>
								{ex.title()}
							</LangKey>
						</NavbarButton>
					{/each}
				</nav>
			{/if}
			<!-- User nav -->
			<menu id="user-group" class="navbar-group" in:flyin|global={2}>
				{#if $breakpoint.lg}
					<NavbarButton menu={localeTrigger}>
						<Languages class="button-icon" />
						<span id="locale-label">{LANG_DETAILS[$page.data.lang].label}</span>
					</NavbarButton>
					{#if $localeOpen}
						<NavbarMenu melt={localeMenu}>
							{#each availableLanguageTags as locale}
								<NavbarMenuButton
									{...$langSwitch(locale)}
									data-sveltekit-noscroll
									data-sveltekit-replacestate
									data-current={$page.data.locale === locale ? true : undefined}
									melt={localeItem}
								>
									{LANG_DETAILS[locale].name}
								</NavbarMenuButton>
							{/each}
						</NavbarMenu>
					{/if}
					<NavbarButton
						square
						on:pointerdown={(e) => {
							mode.toggle();
							return e;
						}}
						on:keydown={(e) => {
							if (e.key === KEYS.SPACE || e.key === KEYS.ENTER) {
								mode.toggle();
							}
							return e;
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
								id="mode-icon"
							>
								<svelte:component this={MODES_DETAILS[$mode].icon} class="button-icon" />
							</div>
						{/key}
					</NavbarButton>
				{/if}
				{#if $page.data.user}
					<NavbarButton square menu={userTrigger}>
						<Avatar {...$page.data.user} />
						{#if !$page.data.user.emailVerified}
							<div class="badge">
								<MailWarning />
							</div>
						{/if}
					</NavbarButton>
					{#if $userOpen}
						<NavbarMenu melt={userMenu}>
							<NavbarMenuGroup>
								<svelte:fragment slot="legend">
									<LangKey>{m.projects()}</LangKey>
								</svelte:fragment>
								<NavbarMenuButton {...$link('/edit/projects')} melt={userItem}>
									<LangKey>{m.nav_editProjects()}</LangKey>
									<Pencil class="button-icon" />
								</NavbarMenuButton>
								<NavbarMenuButton {...$link('/new/project')} melt={userItem}>
									<LangKey>{m.nav_newProject()}</LangKey>
									<FilePlus2 class="button-icon" />
								</NavbarMenuButton>
								<NavbarMenuButton {...$link('/edit/projects/descriptors')} melt={userItem}>
									<LangKey>{m.nav_editProjectDescriptors()}</LangKey>
									<Sliders class="button-icon" />
								</NavbarMenuButton>
							</NavbarMenuGroup>
							<NavbarMenuGroup>
								<svelte:fragment slot="legend">
									<LangKey>{m.orgs()}</LangKey>
								</svelte:fragment>
								<NavbarMenuButton {...$link('/edit/organizations')} melt={userItem}>
									<LangKey>{m.nav_editOrgs()}</LangKey>
									<Pencil class="button-icon" />
								</NavbarMenuButton>
								<NavbarMenuButton {...$link('/new/organization')} melt={userItem}>
									<LangKey>{m.nav_newOrg()}</LangKey>
									<FilePlus2 class="button-icon" />
								</NavbarMenuButton>
								<NavbarMenuButton {...$link('/edit/organizations/descriptors')} melt={userItem}>
									<LangKey>{m.nav_editOrgsDescriptors()}</LangKey>
									<Sliders class="button-icon" />
								</NavbarMenuButton>
							</NavbarMenuGroup>
							<NavbarMenuButton {...$link('/i')} melt={userItem}>
								<LangKey>{m.account()}</LangKey>
								<User2 class="button-icon" />
							</NavbarMenuButton>
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
							<NavbarMenuButton type="submit" form="logout-form" melt={userItem}>
								<LangKey>{m.logout()}</LangKey>
								<LogOut class="button-icon" />
							</NavbarMenuButton>
						</NavbarMenu>
					{/if}
				{:else}
					{@const link = $link('/login')}
					<NavbarButton
						{...link}
						data-current={$page.url.pathname.startsWith($langHref('/signup')) ||
							$page.url.pathname.startsWith($langHref('/reset-password')) ||
							link['data-current'] ||
							undefined}
						square
					>
						<User2 class="button-icon" />
					</NavbarButton>
				{/if}
			</menu>
		</div>
	</header>
{:else}
	<div class="placeholder"></div>
{/if}

<style lang="postcss">
	.placeholder {
		position: sticky;
		top: 0;
		height: var(--navbar-height);
	}

	header {
		font-size: var(--size-sm);
		z-index: 99;
		position: sticky;
		top: 0;
		align-self: stretch;
		padding: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;

		@media (--lg) {
			padding: 0.75rem;
		}

		&::before {
			content: '';
			position: absolute;
			height: 100%;
			width: 100%;
			bottom: calc(100% + var(--base-border-width));
			border-bottom: var(--base-border-width) solid transparent;
			transition:
				all 0.2s ease-out,
				bottom 0.5s var(--ease-out-expo);
			background-color: var(--color-neutral-100);
			:global(:--dark) & {
				background-color: var(--color-neutral-900);
			}
		}

		&.over {
			&::before {
				border-color: color-mix(in srgb, var(--color-neutral-500) 10%, transparent);
				opacity: 1;
				bottom: 0;
			}
		}
	}

	.inner {
		display: grid;
		font-weight: 500;
		flex-direction: row;
		grid-template-columns:
			[full-start site-start]
			1fr
			[site-end explore-start]
			auto
			[explore-end user-start]
			1fr
			[user-end full-end];
		width: 100%;
		max-width: var(--width-lg);
		transition: max-width 0.35s var(--ease-expo);

		:global(:--setout-full-width) & {
			max-width: 100%;
		}
	}

	.navbar-group {
		display: flex;
		flex-direction: row;
		gap: 0.25rem;
	}

	#site-group {
		grid-column: site;
		justify-content: flex-start;
	}

	#explore-group {
		z-index: 1;
		--group-nesting: 3px;
		grid-column: explore;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.035);
		border-radius: var(--base-radius);
		padding: var(--group-nesting);
		backdrop-filter: blur(8px);
		:global(:--dark) & {
			background-color: rgba(255, 255, 255, 0.05);
		}

		& .needle {
			position: absolute;
			z-index: -1;
			inset: 0;
			border-radius: inherit;
			background-color: var(--color-neutral-50);
			outline: var(--base-focus-ring);
			:global(:--dark) & {
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
		padding: 0.2rem 0.5rem;
		opacity: 0.75;
		border-radius: var(--radius-full);
		box-shadow: 0 0 2px -0.5px currentColor;
		transition: all 0.1s ease-out;

		:global(.navbar-button:hover) &,
		:global(.navbar-button[data-state='open']) & {
			color: var(--color-neutral-100);
			background-color: var(--color-primary-700);
			box-shadow: 0 0 0 -0.5px currentColor;
			opacity: 1;
			:global(:--dark) & {
				color: var(--color-neutral-900);
				background-color: var(--color-primary-400);
			}
		}
	}

	#mode-icon {
		position: absolute;
		transform-origin: center 200%;
		line-height: 1em;
	}
</style>
