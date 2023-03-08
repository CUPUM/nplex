<!--
	@component
	# Navbar
	Main navigation bar singleton located in the app's root layout.
-->
<script lang="ts" context="module">
	const OVERLAP_TOP = 41;
	const OVERLAP_HEIGHT = 20;

	export const NAVBAR_WIDTH = {
		Default: null,
		Full: 'full',
	} as const;
	type NavbarWidth = ValueOf<typeof NAVBAR_WIDTH>;

	export const navbarWidth = writableLedger<NavbarWidth>(NAVBAR_WIDTH.Default);

	export const navbarTheme = writableLedger<ThemeName | null>(null);

	export const navbarBackground = writableLedger<string | null>(null);

	interface OverlapNavbarOptions {
		theme?: ThemeName;
		background?: string;
		width?: NavbarWidth;
	}

	/**
	 * Action to control navbar theme when it overlaps the given element.
	 */
	export function overlapNavbar(element: Element, opts: OverlapNavbarOptions) {
		let hasEnteredOnce = false;
		let observer: IntersectionObserver;
		let windowHeight: number;
		function handleIntersection(entries: IntersectionObserverEntry[]) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					hasEnteredOnce = true;
					if (opts.background !== undefined) {
						navbarBackground.set(element, opts.background);
					}
					if (opts.theme !== undefined) {
						navbarTheme.set(element, opts.theme);
					}
					if (opts.width !== undefined) {
						navbarWidth.set(element, opts.width);
					}
				} else {
					if (hasEnteredOnce) {
						navbarWidth.unset(element);
						navbarTheme.unset(element);
						navbarBackground.unset(element);
					}
				}
			});
		}
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
				navbarWidth.unset(element);
				navbarTheme.unset(element);
				navbarBackground.unset(element);
				window.removeEventListener('resize', handleResize);
				if (observer) {
					observer.unobserve(element);
					observer.disconnect();
				}
			},
		} satisfies SvelteActionReturnType;
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$components/Avatar/Avatar.svelte';
	import Icon from '$components/Icon.svelte';
	import { LOGO_SYMBOLS_HREFS } from '$components/Logo.svelte';
	import Popover from '$components/Popover.svelte';
	import { rootScroll } from '$stores/scroll';
	import { debounce } from '$utils/modifiers';
	import { EDITOR_BASE_ROUTE, EXPLORE_ROUTES, MAIN_ROUTES, USER_BASE_ROUTE } from '$utils/routes';
	import { writableLedger } from '$utils/store';
	import { THEMES, type ThemeName } from '$utils/themes';
	import { onMount } from 'svelte';
	import type { ValueOf } from 'ts-essentials';
	import { authModal } from './AuthModal.svelte';
	import NavbarButton from './NavbarButton.svelte';
	import NavbarEditorMenu from './NavbarEditorMenu.svelte';
	import NavbarUserMenu from './NavbarUserMenu.svelte';
	import { rootBackground } from './RootBackground.svelte';

	/**
	 * Key used as data-lock-scroll value for targeted behavior. Important: keep in sync with app.scss
	 * [data-lock-scroll] selector.
	 */
	const key = Symbol('nav');

	let mounted = false;
	let open = false;
	let rootSegment: string;

	const mainNav = Object.values(MAIN_ROUTES);
	const exploreNav = Object.values(EXPLORE_ROUTES);

	$: rootSegment = $page.data.category ? '/' : '/' + $page.url.pathname.split('/', 2)[1];
	$: navbg = $navbarBackground ?? $rootBackground.body ?? null;

	function toggle() {
		open = !open;
		if (open) {
			rootScroll.lock(key);
		} else {
			rootScroll.unlock(key);
		}
	}

	onMount(() => {
		mounted = true;
	});
</script>

<header data-theme={$navbarTheme ? THEMES[$navbarTheme] : undefined} style:--nav-bg={navbg}>
	<menu class="toggle">
		<NavbarButton rounded on:pointerdown={toggle}>
			<Icon name={open ? 'cross' : 'hamburger'} strokeWidth={3} />
		</NavbarButton>
	</menu>
	<nav class:open class:unmounted={!mounted} class={$navbarWidth}>
		<section class="main">
			<NavbarButton equi rounded href="/">
				<svg xmlns="http://www.w3.org/2000/svg" class="logo">
					<use href={LOGO_SYMBOLS_HREFS.monogram} fill="currentColor" />
				</svg>
			</NavbarButton>
			{#each mainNav as route}
				<NavbarButton
					href={route.pathname}
					current={route.pathname.split('#')[0] === rootSegment || undefined}
				>
					{route.title}
				</NavbarButton>
			{/each}
		</section>
		<section class="category" hidden={!$page.data.showCategoryNavbar}>
			{#each exploreNav as r}
				<NavbarButton
					category
					href={r.pathname}
					current={$page.url.pathname.startsWith(r.pathname) || undefined}
				>
					{r.title}
				</NavbarButton>
			{/each}
		</section>
		<section class="session ">
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
					equi
					rounded
					active={!!$authModal}
					href={authModal.getUrl({ url: $page.url }).toString()}
					noscroll
				>
					<Icon name="user" strokeWidth={2} style="font-size: 1.25em" />
				</NavbarButton>
			{/if}
		</section>
	</nav>
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
			justify-content: flex-start;
		}
	}

	nav {
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
		// grid-auto-flow: dense;
		padding: 1rem var(--ui-pad-outer);
		margin: 0 auto;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		transition: max-width 0.25s var(--ui-ease-in-out);

		&.full {
			max-width: 100%;
		}

		@include tablet {
			display: flex;
			flex: unset;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: var(--ui-text-md);
			position: absolute;
			pointer-events: none;
			border-radius: 0 var(--ui-radius-lg) var(--ui-radius-lg) 0;
			overflow-x: hidden;
			overflow-y: auto;
			height: 100svh;
			width: 0;
			background: col(bg, 100);
			transform-origin: top left;
			transition: all 0.35s var(--ui-ease-in);
			&:not(.open) {
				padding-inline: 0;
			}

			&.open {
				border-radius: 0;
				pointer-events: all;
				width: 100vw;
				transition: all 0.2s var(--ui-ease-out);
			}
		}
	}

	.toggle {
		pointer-events: all;
		flex: none;
		align-self: flex-start;
		z-index: 100;
		margin: 1rem;
		display: none;

		@include tablet {
			display: block;
		}
	}

	section {
		--d: calc(0.35s + var(--i, 0) * 0.1s);
		position: relative;
		display: flex;
		flex: none;
		flex-direction: row;
		align-items: center;
		gap: 2px;
		transition: transform 0.25s cubic-bezier(0, 0, 0, 1) var(--d), opacity 0.25s ease-out var(--d),
			background 0.2s ease;

		@include tablet {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		&:not([hidden]) > :global(*) {
			pointer-events: all;
		}
	}

	.unmounted section,
	section[hidden] {
		transform: translateY(-12px);
		opacity: 0;
		pointer-events: none;
	}

	section[hidden] {
		transition-delay: 0s;
	}

	.main {
		grid-column: main;
		justify-self: flex-start;
		--i: 0;
	}

	.category {
		--i: 1;
		--inset: var(--ui-inset);
		--radius: var(--ui-radius-md);
		grid-column: category;
		justify-self: center;
		padding: var(--inset);
		border-radius: var(--radius);
		backdrop-filter: blur(8px);
		// border-radius: calc(var(--outset) + var(--radius));
		// margin-block: calc(-1 * var(--outset));

		@include tablet {
			--outset: 0px;
			margin-block: unset;
			border: var(--ui-border-thickness) solid col(fg, 100, 0.1);
			box-shadow: unset;
		}

		&::before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: inherit;
			background: var(--nav-bg);
			opacity: 0.5;
			filter: brightness(100%);
			border: 1px solid var(--nab-bg);
			transition: opacity 0.25s, border 0.25s;
		}

		:global([data-theme='light']) & {
			background: col(bg, 000, 0.5);
		}
		:global([data-theme='dark']) & {
			background: col(bg, 700, 0.8);
		}
	}

	.session {
		grid-column: session;
		justify-self: flex-end;
		--i: 2;
	}

	.logo {
		position: relative;
		top: -0.1em;
	}
</style>
