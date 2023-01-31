<svelte:options />

<!--
	@component
	# Navbar
	Main navigation bar singleton located in the app's root layout.
-->
<script lang="ts" context="module">
	const OVERLAP_TOP = 41;
	const OVERLAP_HEIGHT = 20;

	type NavbarStyle = {
		theme?: ThemeName;
		background?: string;
	};

	/**
	 * Singleton store to apply a theme to the navbar different than root theme.
	 */
	export const navbarStyle = (function () {
		const { subscribe, set } = writable<NavbarStyle>({});
		/**
		 * First-in-last-out log of applied theme. Prevents bindings from canceling one-another when
		 * close.
		 */
		const keepTheme = new Map<any, NonNullable<NavbarStyle['theme']>>();
		const keepBackground = new Map<any, NonNullable<NavbarStyle['background']>>();
		function _set(opts: NavbarStyle, key: any) {
			if (opts.theme) {
				keepTheme.set(key, opts.theme);
			} else {
				keepTheme.delete(key);
			}
			if (opts.background) {
				keepBackground.set(key, opts.background);
			} else {
				keepBackground.delete(key);
			}
			const newTheme = keepTheme.size ? [...keepTheme][keepTheme.size - 1][1] : undefined;
			const newBackground = keepBackground.size
				? [...keepBackground][keepBackground.size - 1][1]
				: undefined;
			set({ theme: newTheme, background: newBackground });
		}
		return {
			subscribe,
			set: _set,
			reset: (key?: any) => _set({}, key),
		};
	})();

	/**
	 * Action to control navbar theme when it overlaps the given element.
	 */
	export function overlapNavbarStyle(element: Element, opts: NavbarStyle): SvelteActionReturnType {
		let hasEnteredOnce = false;
		let observer: IntersectionObserver;
		let windowHeight: number;
		const handleIntersection = ((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					hasEnteredOnce = true;
					navbarStyle.set(opts, element);
				} else {
					if (hasEnteredOnce) {
						navbarStyle.reset(element);
					}
				}
			});
		}) satisfies IntersectionObserverCallback;
		function initObserver() {
			const rootMargin = `-${OVERLAP_TOP}px 0px -${
				window.innerHeight - (OVERLAP_TOP + OVERLAP_HEIGHT)
			}px 0px`;
			observer = new IntersectionObserver(handleIntersection, { rootMargin });
			observer.observe(element);
			windowHeight = window.innerHeight;
		}
		initObserver();
		const handleResize = debounce((e: UIEvent) => {
			if (observer) {
				if (windowHeight === window.innerHeight) {
					return;
				}
				observer.unobserve(element);
				observer.disconnect();
			}
			initObserver();
		}, 250);
		window.addEventListener('resize', handleResize);
		return {
			update(args) {
				opts = args;
			},
			destroy() {
				navbarStyle.reset(element);
				window.removeEventListener('resize', handleResize);
				if (observer) {
					observer.unobserve(element);
					observer.disconnect();
				}
			},
		};
	}
</script>

<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Avatar from '$components/Avatar.svelte';
	import Icon from '$components/Icon.svelte';
	import { LOGO_SYMBOLS_HREFS } from '$components/Logo.svelte';
	import Popover from '$components/Popover.svelte';
	import { col } from '$utils/css';
	import { debounce } from '$utils/modifiers';
	import { EDITOR_BASE_ROUTE, EXPLORE_ROUTES, MAIN_ROUTES, USER_BASE_ROUTE } from '$utils/routes';
	import { THEMES, type ThemeName } from '$utils/themes';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { authModal } from './AuthModal.svelte';
	import NavbarButton from './NavbarButton.svelte';
	import NavbarEditorMenu from './NavbarEditorMenu.svelte';
	import NavbarUserMenu from './NavbarUserMenu.svelte';
	import { rootBackground } from './RootBackground.svelte';

	let mounted = false;
	let open = false;
	let rootsegment: string;
	let naving = false;

	beforeNavigate(() => {
		naving = true;
	});

	afterNavigate(() => {
		naving = false;
	});

	const mainNav = Object.values(MAIN_ROUTES);
	const exploreNav = Object.values(EXPLORE_ROUTES);

	$: rootsegment = $page.data.category ? '/' : '/' + $page.url.pathname.split('/', 2)[1];
	$: navbg = naving ? 'transparent' : $navbarStyle.background ?? $rootBackground.body ?? null;
	$: categorybg = naving ? 'transparent' : col('bg', '900', 0.5);

	function toggle() {
		open = !open;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<header
	data-theme={$navbarStyle.theme ? THEMES[$navbarStyle.theme] : undefined}
	style:--nav-bg={navbg}
>
	<menu class="toggle">
		<NavbarButton on:pointerdown={toggle} round>
			<Icon name={open ? 'cross' : 'hamburger'} strokeWidth={3} />
		</NavbarButton>
	</menu>
	<div class="navs" class:open class:unmounted={!mounted}>
		<nav class="main">
			<NavbarButton round href="/">
				<svg xmlns="http://www.w3.org/2000/svg" height="1em" width="100%">
					<use href={LOGO_SYMBOLS_HREFS.monogram} fill="currentColor" />
				</svg>
			</NavbarButton>
			{#each mainNav as route}
				<NavbarButton href={route.pathname} current={route.pathname.split('#')[0] === rootsegment}>
					{route.title}
				</NavbarButton>
			{/each}
		</nav>
		<nav class="category" style:background={categorybg} hidden={!$page.data.showCategoryNav}>
			{#each exploreNav as r}
				<NavbarButton
					group={'category'}
					href={r.pathname}
					current={$page.url.pathname.startsWith(r.pathname)}
				>
					{r.title}
				</NavbarButton>
			{/each}
		</nav>
		<nav class="session ">
			{#if $page.data.session}
				<Popover place="bottom" align="end" hover let:open>
					<NavbarButton
						equi
						slot="control"
						href={EDITOR_BASE_ROUTE.pathname}
						current={$page.url.pathname.startsWith(EDITOR_BASE_ROUTE.pathname)}
						active={open}
					>
						<Icon name="pen" style="font-size: 1.25em" />
					</NavbarButton>
					<NavbarEditorMenu />
				</Popover>
				<Popover hover place="bottom" align="end" let:open>
					<Avatar
						active={open}
						slot="control"
						data={$page.data.session.user}
						href={USER_BASE_ROUTE.pathname}
					/>
					<NavbarUserMenu />
				</Popover>
			{:else}
				<NavbarButton
					round
					active={!!$authModal}
					href={authModal.getUrl({ url: $page.url }).toString()}
					noscroll
				>
					<Icon name="user" strokeWidth={2} style="font-size: 1.25em" />
				</NavbarButton>
			{/if}
		</nav>
	</div>
</header>

<style lang="scss">
	header {
		--nav-bg: var(--color-bg-100);
		pointer-events: none;
		position: sticky;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		z-index: 100;
		top: 0;

		@include tablet {
			align-items: flex-start;
		}
	}

	.navs {
		position: relative;
		max-width: var(--ui-width-main);
		font-size: var(--ui-text-sm);
		width: 100%;
		display: grid;
		grid-template-columns:
			[full-start main-start]
			1fr
			[main-end category-start]
			auto
			[category-end session-start]
			1fr
			[session-end full-end];
		grid-auto-flow: dense;
		padding: 1rem 1.5rem;
		margin: 0 auto;
		flex-direction: row;
		align-items: center;
		gap: 1rem;

		@include tablet {
			display: flex;
			flex: unset;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-end;
			font-size: var(--ui-text-md);
			position: absolute;
			pointer-events: none;
			border-radius: var(--ui-radius-lg);
			overflow: hidden;
			height: 100vh;
			width: 0;
			background: col(bg, 100, 0.92);
			backdrop-filter: blur(8px);
			transform-origin: top left;
			transition: all 0.35s var(--ui-ease-in);
			&:not(.open) {
				padding-inline: 0;
			}

			&.open {
				pointer-events: all;
				width: 100vw;
				transition: all 0.2s var(--ui-ease-out);
			}
		}
	}

	menu {
		pointer-events: all;
		width: 100%;
		z-index: 100;
		padding: 1.5rem;
		display: none;

		@include tablet {
			display: block;
		}
	}

	nav {
		--d: calc(0.35s + var(--i, 0) * 0.1s);
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2px;
		transition: transform 0.25s cubic-bezier(0, 0, 0, 1) var(--d), opacity 0.25s ease-out var(--d),
			background 0.1s ease;

		@include tablet {
			flex-direction: column;
			align-items: flex-start;
		}

		> :global(*) {
			pointer-events: all;
		}
	}

	.unmounted nav,
	nav[hidden] {
		transform: translateY(-12px);
		opacity: 0;
	}

	nav[hidden] {
		transition-delay: 0s;
		pointer-events: none;
	}

	.main {
		grid-column: main;
		justify-content: flex-start;
		--i: 0;
	}

	.category {
		--inset: 3px;
		--i: 1;
		grid-column: category;
		justify-content: center;
		border-radius: calc(var(--ui-radius-md) + var(--inset));
		backdrop-filter: blur(8px);
		padding: var(--inset);
	}

	.session {
		grid-column: session;
		justify-content: flex-end;
		--i: 2;
	}
</style>
