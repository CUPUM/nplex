<!--
	@component
	# Navbar
	Main navigation bar singleton located in the app's root layout.
-->
<script lang="ts" context="module">
	import { intersection, INTERSECTION_EVENT } from '$actions/intersection';

	/**
	 * Singleton store to apply a theme to the navbar different than root theme.
	 */
	export const navbarTheme = (function () {
		const { subscribe, set } = writable<ThemeName | undefined>(undefined);
		return {
			subscribe,
			set,
			reset: () => set(undefined),
		};
	})();

	/**
	 * Action to update the navbar's theme based on element intersection.
	 */
	export function setNavbarTheme(element: HTMLElement, theme: ThemeName): SvelteActionReturnType {
		const intersect = intersection(element, {
			rootMargin: '-40px 0px 0% 0px',
		});
		function handleEnter() {
			navbarTheme.set(theme);
		}
		function handleLeave() {
			navbarTheme.reset();
		}
		element.addEventListener(INTERSECTION_EVENT.enter, handleEnter);
		element.addEventListener(INTERSECTION_EVENT.leave, handleLeave);
		return {
			update(newOptions) {
				if (newOptions.observerOptions) {
					intersect.update(newOptions.observerOptions);
				}
			},
			destroy() {
				intersect.destroy();
				handleLeave();
			},
		};
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$components/Avatar.svelte';
	import Icon from '$components/Icon.svelte';
	import { LOGO_SYMBOLS_HREFS } from '$components/Logo.svelte';
	import Popover from '$components/Popover.svelte';
	import { EDITOR_BASE_ROUTE, EXPLORE_ROUTES, MAIN_ROUTES, USER_BASE_ROUTE } from '$utils/routes';
	import { THEMES, type ThemeName } from '$utils/themes';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { authModal } from './AuthModal.svelte';
	import NavbarButton from './NavbarButton.svelte';
	import NavbarEditorMenu from './NavbarEditorMenu.svelte';
	import NavbarUserMenu from './NavbarUserMenu.svelte';

	let mounted = false;
	let open = false;
	let rootsegment: string;

	const mainNav = Object.values(MAIN_ROUTES);
	const exploreNav = Object.values(EXPLORE_ROUTES);

	$: rootsegment = $page.data.category ? '/' : '/' + $page.url.pathname.split('/', 2)[1];

	function toggle() {
		open = !open;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<header data-theme={$navbarTheme ? THEMES[$navbarTheme] : undefined}>
	<menu class="toggle">
		<NavbarButton on:pointerdown={toggle} round>
			<Icon name={open ? 'cross' : 'arrow-down-right'} strokeWidth="3" />
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
		<nav class="category" hidden={!$page.data.showCategoryNav}>
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
				>
					<Icon name="user" strokeWidth="2" style="font-size: 1.25em" />
				</NavbarButton>
			{/if}
		</nav>
	</div>
</header>

<style lang="scss">
	header {
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
		padding: var(--ui-gutter);
		padding-top: calc(0.5 * var(--ui-gutter));
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
		padding: var(--ui-gutter);
		display: none;

		@include tablet {
			display: block;
		}
	}

	nav {
		--d: calc(0.35s + var(--i, 0) * 0.1s);
		position: relative;
		pointer-events: all;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2px;
		transition: transform 0.25s cubic-bezier(0, 0, 0, 1) var(--d), opacity 0.25s ease-out var(--d);

		@include tablet {
			flex-direction: column;
			align-items: flex-start;
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
		grid-column: category;
		justify-content: center;
		border-radius: var(--ui-radius-md);
		backdrop-filter: blur(12px);
		background: col(bg, 900, 0.5);
		box-shadow: 0 0 0 2px col(bg, 900, 0.5);
		--i: 1;
	}

	.session {
		grid-column: session;
		justify-content: flex-end;
		--i: 2;
	}
</style>
