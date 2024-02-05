<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import * as m from '$i18n/messages';
	import { availableLanguageTags } from '$i18n/runtime';
	import { ripple } from '$lib/actions/ripple';
	import { breakpoint } from '$lib/breakpoints/breakpoints';
	import Avatar from '$lib/components/Avatar.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { LANG_DETAILS } from '$lib/i18n/constants';
	import { langSwitch, link, noLang } from '$lib/i18n/link';
	import { MODES_DETAILS } from '$lib/modes/constants';
	import { mode } from '$lib/modes/store';
	import { transform } from '$lib/motion/transform';
	import { setout } from '$lib/setout/store';
	import type { MessageFunction } from '$lib/utils/types';
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
			gutter: 12,
			placement: 'bottom',
		},
		preventScroll: false,
		portal: '#navbar',
	} satisfies CreateDropdownMenuProps;

	const explore = [
		{ key: 'projects', title: m.projects },
		{ key: 'organizations', title: m.orgs },
	] satisfies { key: string; title: MessageFunction }[];

	const {
		elements: { menu: langMenu, item: langItem, trigger: langTrigger },
		states: { open: langOpen },
	} = createDropdownMenu(dropdownMenuOptions);

	const {
		elements: { menu: userMenu, item: userItem, trigger: userTrigger },
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
			return scale(node, { start: 0.5, duration: 150, easing: expoOut, opacity: 0 });
		},
	});

	let scrollY = 0;
	let mounted = false;

	function flyin(node: HTMLElement, i: number) {
		return fly(node, { y: '25%', duration: 750, easing: expoOut, delay: i * 75 });
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:window bind:scrollY />

<!-- svelte-ignore a11y-missing-attribute -->
{#if mounted && $setout && $breakpoint}
	<header id="navbar" class={$setout} class:over={scrollY > 14 && !$page.data.navbar?.noBackground}>
		<div class="inner">
			<!-- General nav -->
			<nav id="site-group" class="navbar-group" in:flyin|global={0}>
				<NavbarButton square={!$breakpoint.md} {...$link('/')} rounded ghost>
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
				<nav id="explore-group" in:flyin|global={1}>
					{#each explore as ex}
						{@const link = $link(`/${ex.key}`)}
						<a class="explore-link" {...link} use:ripple>
							{#if link['data-current']}
								<div
									class="explore-thumb"
									in:receiveExplore={{ key: 'explore' }}
									out:sendExplore={{ key: 'explore' }}
								/>
							{/if}
							<LangKey>
								{ex.title()}
							</LangKey>
						</a>
					{/each}
				</nav>
			{/if}
			<!-- User nav -->
			<menu id="user-group" class="navbar-group" in:flyin|global={2}>
				{#if $breakpoint.lg}
					<NavbarButton menu={langTrigger}>
						<Languages class="button-icon" />
						<span id="lang-label">{LANG_DETAILS[$page.data.lang].label}</span>
					</NavbarButton>
					{#if $langOpen}
						<NavbarMenu melt={langMenu}>
							{#each availableLanguageTags as lang}
								<NavbarMenuButton
									{...$langSwitch(lang)}
									data-sveltekit-noscroll
									data-sveltekit-replacestate
									data-current={$page.data.lang === lang ? true : undefined}
									melt={langItem}
								>
									{LANG_DETAILS[lang].name}
								</NavbarMenuButton>
							{/each}
						</NavbarMenu>
					{/if}
					<NavbarButton
						square
						on:click={(e) => {
							mode.toggle();
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
									opacity: 0,
								}}
								out:transform={{
									scale: 0.5,
									rotate: [0, 0, 90],
									duration: 250,
									easing: cubicIn,
									opacity: 0,
								}}
								id="mode-icon"
							>
								<svelte:component this={MODES_DETAILS[$mode].icon} class="button-icon" />
							</div>
						{/key}
					</NavbarButton>
				{/if}
				{#if $page.data.user}
					<NavbarButton square rounded menu={userTrigger}>
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
								<div>
									<LangKey>{m.user_role()}</LangKey>:
									{#await $page.data.roleName}
										'...'
									{:then roleName}
										{roleName}
									{/await}
								</div>
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
							</NavbarMenuGroup>
							<NavbarMenuGroup>
								<svelte:fragment slot="legend">
									<LangKey>{m.projects()}</LangKey>
								</svelte:fragment>
								<NavbarMenuButton {...$link('/edit/projects')} melt={userItem}>
									<LangKey>{m.nav_edit_projects()}</LangKey>
									<Pencil class="button-icon" />
								</NavbarMenuButton>
								<NavbarMenuButton {...$link('/new/project')} melt={userItem}>
									<LangKey>{m.nav_new_project()}</LangKey>
									<FilePlus2 class="button-icon" />
								</NavbarMenuButton>
								<NavbarMenuButton {...$link('/edit/projects/descriptors')} melt={userItem}>
									<LangKey>{m.nav_edit_project_descriptors()}</LangKey>
									<Sliders class="button-icon" />
								</NavbarMenuButton>
							</NavbarMenuGroup>
							<NavbarMenuGroup>
								<svelte:fragment slot="legend">
									<LangKey>{m.orgs()}</LangKey>
								</svelte:fragment>
								<NavbarMenuButton {...$link('/edit/organizations')} melt={userItem}>
									<LangKey>{m.nav_edit_orgs()}</LangKey>
									<Pencil class="button-icon" />
								</NavbarMenuButton>
								<NavbarMenuButton {...$link('/new/organization')} melt={userItem}>
									<LangKey>{m.nav_new_org()}</LangKey>
									<FilePlus2 class="button-icon" />
								</NavbarMenuButton>
								<NavbarMenuButton {...$link('/edit/organizations/descriptors')} melt={userItem}>
									<LangKey>{m.nav_edit_orgs_descriptors()}</LangKey>
									<Sliders class="button-icon" />
								</NavbarMenuButton>
							</NavbarMenuGroup>
						</NavbarMenu>
					{/if}
				{:else}
					{@const link = $link('/login')}
					<NavbarButton
						{...link}
						data-current={$noLang.startsWith('/signup') ||
							$noLang.startsWith('/reset-password') ||
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
		/* position: sticky; */
		position: relative;
		top: 0;
		height: var(--navbar-height);
	}

	header {
		font-size: var(--size-sm);
		z-index: 90;
		/* position: sticky; */
		position: relative;
		top: 0;
		align-self: stretch;
		padding: var(--base-gutter);
		display: flex;
		align-items: center;
		justify-content: center;

		&::before {
			pointer-events: none;
			content: '';
			position: absolute;
			width: 100%;
			height: calc(100% + var(--base-border-width));
			top: -100%;
			background: transparent;
			border-bottom-color: transparent;
			transition:
				all 0.35s ease-in,
				top 0.5s var(--ease-in-expo);
		}

		&.over {
			&::before {
				top: 0;
				background: var(--base-bg);
				border-bottom: var(--base-border-width) solid var(--base-border-color-dim);
				/* background: linear-gradient(var(--base-bg) 25%, transparent 100%); */
				transition:
					all 0.25s ease-out,
					top 0.5s var(--ease-out-expo);
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
		--group-nesting: 4px;
		/* --group-radius: calc(var(--base-radius) + var(--group-nesting)); */
		--group-radius: var(--base-radius);
		--_nested-radius: calc(var(--group-radius) - var(--group-nesting));
		--_nested-inline-padding: calc(var(--base-inline-padding) - var(--group-nesting));
		display: flex;
		flex-direction: row;
		z-index: 1;
		grid-column: explore;
		justify-content: center;
		border-radius: var(--group-radius);
		padding: var(--group-nesting);
		backdrop-filter: blur(8px);
		gap: 0;
		background: var(--base-bg);
		box-shadow: 0 0 0 var(--base-border-width) var(--base-border-color-dim);
		:global(:--dark) & {
			/* background: var(--base-bg); */
		}

		> * {
			--base-radius: var(--_nested-radius);
			--base-inline-padding: var(--_nested-inline-padding);
		}
	}

	.explore-link {
		display: flex;
		flex-direction: row;
		align-items: center;
		line-height: 0;
		padding-inline: var(--base-inline-padding);
		border-radius: var(--base-radius);
		position: relative;
		transition: all var(--duration-fast) ease-out;

		&:hover {
			color: var(--color-primary-700);
			background: color-mix(in srgb, var(--color-primary-700) 10%, transparent);
			:global(:--dark) & {
				color: var(--color-primary-400);
				background: color-mix(in srgb, var(--color-primary-500) 10%, transparent);
			}
		}

		&:focus-visible {
			outline: var(--base-focus-ring);
		}

		&[data-current] {
			color: var(--color-neutral-100);
			:global(:--dark) & {
				color: var(--color-primary-900);
			}
		}
	}

	.explore-thumb {
		position: absolute;
		z-index: -1;
		inset: 0;
		border-radius: inherit;
		background-color: var(--color-primary-950);
		:global(:--dark) & {
			background-color: var(--color-neutral-200);
		}
	}

	#user-group {
		grid-column: user;
		justify-content: flex-end;
	}

	#lang-label {
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
		line-height: 0;
		position: absolute;
		transform-origin: center 200%;
	}
</style>
