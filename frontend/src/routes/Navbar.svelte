<!--
	@component
	## Navbar
	Main navigation bar singleton located in the app's root layout.

-->
<script lang="ts" context="module">
	export const navbarTheme = (function () {
		const { subscribe, set } = writable<keyof typeof THEME_CLASSES | null>(null);
		return {
			subscribe,
			set,
			reset: () => set(null),
		};
	})();
</script>

<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Avatar from '$components/Avatar.svelte';
	import Icon from '$components/Icon.svelte';
	import Logo from '$components/Logo.svelte';
	import Popover from '$components/Popover.svelte';
	import { rootScroll } from '$stores/scroll';
	import { EDITOR_BASE_ROUTE, EXPLORE_ROUTES, MAIN_ROUTES, USER_BASE_ROUTE } from '$utils/routes';
	import { THEME_CLASSES } from '$utils/themes';
	import { writable } from 'svelte/store';
	import AppNavbarButton from './AppNavbarButton.svelte';
	import AppNavbarEditorMenu from './AppNavbarEditorMenu.svelte';
	import AppNavbarUserMenu from './AppNavbarUserMenu.svelte';
	import { authModal } from './AuthModal.svelte';

	export let navbarHeight = 0;

	let hidden: boolean;
	let rootPathname: string;
	let thres = navbarHeight || 40;
	let loadingCategoryPath: string | null = '';

	const mainNav = Object.values(MAIN_ROUTES);
	const exploreNav = Object.values(EXPLORE_ROUTES);

	beforeNavigate(({ to }) => {
		if (
			to &&
			Object.values(EXPLORE_ROUTES)
				.map((r) => r.pathname as string)
				.includes(to.url.pathname)
		) {
			loadingCategoryPath = to.url.pathname;
		}
	});

	afterNavigate(() => {
		loadingCategoryPath = null;
	});

	$: hidden = $rootScroll.down && $rootScroll.y > thres;
	$: rootPathname = $page.data.category ? '' : '/' + $page.url.pathname.split('/', 2)[1];
</script>

<header
	class={$navbarTheme ? THEME_CLASSES[$navbarTheme] : ''}
	class:hidden
	bind:clientHeight={navbarHeight}
>
	<div class="wrapper">
		<nav class="main">
			<AppNavbarButton round href="/">
				<Logo short style="font-size: larger" />
			</AppNavbarButton>
			{#each mainNav as route}
				<AppNavbarButton href={route.pathname} current={route.pathname === rootPathname}>
					{route.label}
				</AppNavbarButton>
			{/each}
		</nav>
		<nav class="category">
			{#each exploreNav as r}
				<AppNavbarButton href={r.pathname} current={$page.url.pathname.startsWith(r.pathname)}>
					{r.label}
				</AppNavbarButton>
			{/each}
		</nav>
		<nav class="session">
			{#if $page.data.session}
				<Popover place="bottom" align="end" hover let:open>
					<AppNavbarButton
						equi
						slot="control"
						href={EDITOR_BASE_ROUTE.pathname}
						current={$page.url.pathname.startsWith(EDITOR_BASE_ROUTE.pathname)}
						active={open}
					>
						<Icon name="pen" style="font-size: 1.25em" />
					</AppNavbarButton>
					<AppNavbarEditorMenu />
				</Popover>
				<Popover hover place="bottom" align="end" let:open>
					<Avatar
						active={open}
						slot="control"
						data={$page.data.session.user}
						href={USER_BASE_ROUTE.pathname}
					/>
					<AppNavbarUserMenu />
				</Popover>
			{:else}
				<AppNavbarButton round cta href={authModal.getUrl({ url: $page.url }).toString()}>
					<Icon name="user" strokeWidth="1.5" style="font-size: 1.25em" />
				</AppNavbarButton>
			{/if}
		</nav>
	</div>
</header>

<style lang="scss">
	header {
		position: sticky;
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 100;
		top: 0;
		padding: 0;
		margin: 0;
		font-size: var(--ui-text-sm);
	}

	.wrapper {
		position: relative;
		max-width: var(--ui-size-xl);
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
		padding-top: var(--ui-gutter);
		padding-inline: var(--ui-gutter);
		margin: 0 auto;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		@include mobile {
			grid-template-columns:
				[full-start main-start]
				auto
				[main-end category-start]
				auto
				[category-end session-start]
				auto
				[session-end full-end];
		}
	}

	.main,
	.category,
	.session {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 3px;
		@include mobile {
			flex-direction: column;
		}
	}

	.main {
		grid-column: main;
		justify-content: flex-start;
	}

	.category {
		grid-column: category;
		justify-content: center;
		background: col(bg, 500, 0.8);
		border-radius: var(--ui-radius-md);
		width: 100%;
		gap: 0;
		backdrop-filter: blur(10px);
	}

	.session {
		grid-column: session;
		justify-content: flex-end;
	}
</style>
