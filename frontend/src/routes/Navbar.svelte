<!--
	@component
	# Navbar
	Main navigation bar singleton located in the app's root layout.
-->
<script lang="ts" context="module">
	export const navbarTheme = (function () {
		const { subscribe, set } = writable<ThemeName | null>(null);
		return {
			subscribe,
			set,
			reset: () => set(null),
		};
	})();

	const SCROLL_LOCK_KEY = 'nav-scroll-lock';
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$components/Avatar.svelte';
	import Icon from '$components/Icon.svelte';
	import Logo from '$components/Logo.svelte';
	import Popover from '$components/Popover.svelte';
	import { EDITOR_BASE_ROUTE, EXPLORE_ROUTES, MAIN_ROUTES, USER_BASE_ROUTE } from '$utils/routes';
	import { THEME_NAMES, type ThemeName } from '$utils/themes';
	import { writable } from 'svelte/store';
	import { authModal } from './AuthModal.svelte';
	import NavbarButton from './NavbarButton.svelte';
	import NavbarEditorMenu from './NavbarEditorMenu.svelte';
	import NavbarUserMenu from './NavbarUserMenu.svelte';

	// export let navbarHeight;

	let open = false;
	let rootsegment: string;

	const mainNav = Object.values(MAIN_ROUTES);
	const exploreNav = Object.values(EXPLORE_ROUTES);

	$: rootsegment = $page.data.category ? '/' : '/' + $page.url.pathname.split('/', 2)[1];

	function toggle() {
		open = !open;
	}

	// $: if (open) {
	// 	rootScroll.lock(SCROLL_LOCK_KEY);
	// } else {
	// 	rootScroll.unlock(SCROLL_LOCK_KEY);
	// }
</script>

<header data-theme={$navbarTheme ? THEME_NAMES[$navbarTheme] : undefined}>
	<menu class="toggle ">
		<NavbarButton on:pointerdown={toggle} round>
			<Icon name={open ? 'cross' : 'arrow-down-right'} strokeWidth="3" />
		</NavbarButton>
	</menu>
	<div class="navs" class:open>
		<nav class="main">
			<NavbarButton round href="/">
				<Logo short style="font-size: larger" />
			</NavbarButton>
			{#each mainNav as route}
				<NavbarButton href={route.pathname} current={route.pathname === rootsegment}>
					{route.label}
				</NavbarButton>
			{/each}
		</nav>
		<nav class="category ">
			{#each exploreNav as r}
				<NavbarButton
					group={'category'}
					href={r.pathname}
					current={$page.url.pathname.startsWith(r.pathname)}
				>
					{r.label}
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
		position: relative;
		pointer-events: all;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 3px;
		@include tablet {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	.main {
		grid-column: main;
		justify-content: flex-start;
	}

	.category {
		grid-column: category;
		justify-content: center;
		border-radius: var(--ui-radius-md);
		backdrop-filter: blur(12px);
		background: col(fg, 100, 0.1);
		box-shadow: 0 0 0 2px col(fg, 100, 0.1);

		// :global([data-group='category']) {
		// 	&:not(:first-of-type) {
		// 		border-top-left-radius: 0;
		// 		border-bottom-left-radius: 0;
		// 	}
		// 	&:not(:last-of-type) {
		// 		border-top-right-radius: 0;
		// 		border-bottom-right-radius: 0;
		// 	}
		// }
	}

	.session {
		grid-column: session;
		justify-content: flex-end;
	}
</style>
